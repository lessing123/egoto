@echo off
setlocal

echo === TEST 1: Health Check ===
curl -s http://localhost:3000/api/health
echo.
echo.

echo === TEST 2: Register User 1 (Kofi Mensah) ===
curl -s -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"phone\":\"+22890123456\",\"pin\":\"1234\",\"firstName\":\"Kofi\",\"lastName\":\"Mensah\"}"
echo.
echo.

echo === TEST 3: Register User 2 (Ama Adjo) ===
curl -s -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"phone\":\"+22891234567\",\"pin\":\"5678\",\"firstName\":\"Ama\",\"lastName\":\"Adjo\"}"
echo.
echo.

echo === TEST 4: Login User 1 ===
curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"phone\":\"+22890123456\",\"pin\":\"1234\"}" > %TEMP%\egoto_login.json
type %TEMP%\egoto_login.json
echo.
echo.

REM Extract token (rough but works for testing)
for /f "tokens=2 delims=:," %%a in ('findstr /C:"token" %TEMP%\egoto_login.json') do set TOKEN=%%~a
set TOKEN=%TOKEN:"=%
set TOKEN=%TOKEN: =%
echo TOKEN=%TOKEN%
echo.

echo === TEST 5: Get Profile (with token) ===
curl -s http://localhost:3000/api/auth/me -H "Authorization: Bearer %TOKEN%"
echo.
echo.

echo === TEST 6: Access without token (should 401) ===
curl -s http://localhost:3000/api/auth/me
echo.
echo.

echo === TEST 7: Login with wrong PIN (should 401) ===
curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"phone\":\"+22890123456\",\"pin\":\"9999\"}"
echo.
echo.

echo === TEST 8: Register duplicate phone (should 409) ===
curl -s -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"phone\":\"+22890123456\",\"pin\":\"1234\",\"firstName\":\"Kofi\",\"lastName\":\"Mensah\"}"
echo.
echo.

echo === TEST 9: Invalid phone format (should 400) ===
curl -s -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"phone\":\"090123456\",\"pin\":\"1234\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
echo.
echo.

echo === TEST 10: Create Circle ===
curl -s -X POST http://localhost:3000/api/circles -H "Content-Type: application/json" -H "Authorization: Bearer %TOKEN%" -d "{\"name\":\"Tontine Adawlato\",\"amount\":5000,\"frequency\":\"weekly\",\"maxMembers\":5}" > %TEMP%\egoto_circle.json
type %TEMP%\egoto_circle.json
echo.
echo.

REM Extract circle ID
for /f "tokens=2 delims=:," %%a in ('findstr /C:"id" %TEMP%\egoto_circle.json') do (
  set CIRCLE_ID=%%~a
  goto :gotid
)
:gotid
set CIRCLE_ID=%CIRCLE_ID:"=%
set CIRCLE_ID=%CIRCLE_ID: =%
echo CIRCLE_ID=%CIRCLE_ID%
echo.

echo === TEST 11: List My Circles ===
curl -s http://localhost:3000/api/circles -H "Authorization: Bearer %TOKEN%"
echo.
echo.

echo === TEST 12: Get Circle Detail ===
curl -s http://localhost:3000/api/circles/%CIRCLE_ID% -H "Authorization: Bearer %TOKEN%"
echo.
echo.

echo === TEST 13: Login User 2 and Join Circle ===
curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"phone\":\"+22891234567\",\"pin\":\"5678\"}" > %TEMP%\egoto_login2.json
for /f "tokens=2 delims=:," %%a in ('findstr /C:"token" %TEMP%\egoto_login2.json') do set TOKEN2=%%~a
set TOKEN2=%TOKEN2:"=%
set TOKEN2=%TOKEN2: =%
curl -s -X POST http://localhost:3000/api/circles/%CIRCLE_ID%/join -H "Authorization: Bearer %TOKEN2%"
echo.
echo.

echo === TEST 14: List Circle Members ===
curl -s http://localhost:3000/api/circles/%CIRCLE_ID%/members -H "Authorization: Bearer %TOKEN%"
echo.
echo.

echo === TEST 15: User 2 tries to join again (should 409) ===
curl -s -X POST http://localhost:3000/api/circles/%CIRCLE_ID%/join -H "Authorization: Bearer %TOKEN2%"
echo.
echo.

echo === TEST 16: Update Profile ===
curl -s -X PUT http://localhost:3000/api/auth/me -H "Content-Type: application/json" -H "Authorization: Bearer %TOKEN%" -d "{\"language\":\"en\"}"
echo.
echo.

echo === TEST 17: Change PIN ===
curl -s -X PUT http://localhost:3000/api/auth/pin -H "Content-Type: application/json" -H "Authorization: Bearer %TOKEN%" -d "{\"oldPin\":\"1234\",\"newPin\":\"4321\"}"
echo.
echo.

echo === ALL TESTS COMPLETE ===

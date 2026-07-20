import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { content, errorMessage, t, Language } from "@egoto/shared";
import { COLORS } from "./src/theme/colors";
import { GlassCard } from "./src/components/GlassCard";
import { Button, Input, ProgressBar } from "./src/components/UI";
import { Onboarding1 } from "./src/components/illustrations/Onboarding1";
import { Onboarding2 } from "./src/components/illustrations/Onboarding2";
import { Onboarding3 } from "./src/components/illustrations/Onboarding3";
import { EmptyState } from "./src/components/illustrations/EmptyState";
import {
  HomeIcon,
  CirclesIcon,
  PotsIcon,
  CardsIcon,
  ProfileIcon,
  LockIcon,
  UnlockIcon,
  PlusIcon,
  StarIcon,
} from "./src/components/Icons";
import { api, setToken } from "./src/lib/api";

const { width } = Dimensions.get("window");

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<"onboarding" | "auth" | "main">("onboarding");
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("fr");
  const [activeTab, setActiveTab] = useState<"home" | "circles" | "pots" | "cards" | "profile">("home");

  // Auth States
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [authStep, setAuthStep] = useState<"phone" | "login" | "register">("phone");
  const [loading, setLoading] = useState(false);

  // App Data States
  const [profile, setProfile] = useState<any>(null);
  const [circles, setCircles] = useState<any[]>([]);
  const [pots, setPots] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [scoreInfo, setScoreInfo] = useState<any>(null);

  // Modal / Form States
  const [showCreateCircle, setShowCreateCircle] = useState(false);
  const [showJoinCircle, setShowJoinCircle] = useState(false);
  const [showCreatePot, setShowCreatePot] = useState(false);
  const [showAdminCircle, setShowAdminCircle] = useState(false);
  const [adminCircleTarget, setAdminCircleTarget] = useState<any>(null);
  const [adminInvitePhone, setAdminInvitePhone] = useState("");
  const [adminCircleName, setAdminCircleName] = useState("");
  const [circleForm, setCircleForm] = useState({ name: "", amount: "", frequency: "weekly", maxMembers: "5" });
  const [potForm, setPotForm] = useState({ name: "", targetAmount: "", mode: "free", frequency: "weekly", fixedAmount: "", isLocked: false });
  const [joinInviteCode, setJoinInviteCode] = useState("");

  // Contribute Modal States
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributeType, setContributeType] = useState<"circle" | "pot">("circle");
  const [contributeTargetId, setContributeTargetId] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");
  const [contributeMethod, setContributeMethod] = useState<"tmoney" | "moov" | "bank" | "visa">("tmoney");

  // Load Initial Session
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);

  // Fetch App Data when entering Main screen or changing tabs
  const refreshData = async () => {
    setLoading(true);
    try {
      const pRes = await api.getProfile();
      if (pRes.success) setProfile(pRes.data);

      const cRes = await api.listCircles();
      if (cRes.success) setCircles(cRes.data);

      const potRes = await api.listPots();
      if (potRes.success) setPots(potRes.data);

      const cardRes = await api.listCards();
      if (cardRes.success) setCards(cardRes.data);

      const scoreRes = await api.getScore();
      if (scoreRes.success) setScoreInfo(scoreRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentScreen === "main") {
      refreshData();
    }
  }, [currentScreen]);

  // ─── AUTH ACTIONS ──────────────────────────────────────────

  const handlePhoneCheck = async () => {
    const cleanedPhone = phone.replace(/\s+/g, "");
    console.log("Checking phone number:", cleanedPhone);
    
    if (!/^\+228\d{8}$/.test(cleanedPhone)) {
      console.warn("Invalid phone format:", cleanedPhone);
      Alert.alert(
        language === "fr" ? "Format invalide" : "Invalid format",
        language === "fr" 
          ? "Veuillez entrer un numéro au format +228 suivi de 8 chiffres sans espace (ex: +22890123456)." 
          : "Please enter a number in the format +228 followed by 8 digits without spaces (e.g. +22890123456)."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await api.checkExists(cleanedPhone);
      console.log("checkExists response:", res);
      setLoading(false);

      if (res.success) {
        setPhone(cleanedPhone); // Conserve le numéro sans espace
        if (res.data?.exists) {
          setAuthStep("login");
        } else {
          setAuthStep("register");
        }
      } else {
        const errorMsg = errorMessage(language, res.error?.code || "GENERIC");
        console.error("API error checking phone exists:", res.error);
        Alert.alert(language === "fr" ? "Erreur" : "Error", errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network error during checkExists:", error);
      Alert.alert(
        language === "fr" ? "Erreur réseau" : "Connection Error",
        language === "fr" 
          ? "Impossible de contacter le serveur Egoto. Assurez-vous que le serveur backend tourne sur le port 3000 (npm run dev:backend)."
          : "Cannot connect to the Egoto backend. Make sure the backend server is running on port 3000 (npm run dev:backend)."
      );
    }
  };

  const handleLogin = async () => {
    if (!/^\d{4}$/.test(pin)) {
      Alert.alert(t(language, "errors.invalidPinFormat"));
      return;
    }
    setLoading(true);
    try {
      console.log("Logging in phone:", phone);
      const res = await api.login(phone, pin);
      console.log("Login response:", res);
      setLoading(false);

      if (res.success) {
        setToken(res.data.token);
        setLanguage(res.data.user.language as Language);
        setCurrentScreen("main");
      } else {
        const errorMsg = errorMessage(language, res.error?.code || "GENERIC");
        Alert.alert(language === "fr" ? "Échec de connexion" : "Login Failed", errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network error during login:", error);
      Alert.alert(
        language === "fr" ? "Erreur réseau" : "Connection Error",
        language === "fr" ? "Connexion impossible avec le serveur backend." : "Cannot connect to the backend server."
      );
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !pin) {
      Alert.alert(t(language, "errors.missingFields"));
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      Alert.alert(t(language, "errors.invalidPinFormat"));
      return;
    }
    setLoading(true);
    try {
      console.log("Registering profile:", { phone, firstName, lastName });
      const res = await api.register({ phone, pin, firstName, lastName, language });
      console.log("Register response:", res);
      setLoading(false);

      if (res.success) {
        setToken(res.data.token);
        setCurrentScreen("main");
      } else {
        const errorMsg = errorMessage(language, res.error?.code || "GENERIC");
        Alert.alert(language === "fr" ? "Échec d'inscription" : "Registration Failed", errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Network error during registration:", error);
      Alert.alert(
        language === "fr" ? "Erreur réseau" : "Connection Error",
        language === "fr" ? "Connexion impossible avec le serveur backend." : "Cannot connect to the backend server."
      );
    }
  };

  // ─── CERCLE ACTIONS ────────────────────────────────────────

  const handleCreateCircle = async () => {
    const amountNum = parseInt(circleForm.amount);
    const maxMembersNum = parseInt(circleForm.maxMembers);
    if (!circleForm.name || isNaN(amountNum) || isNaN(maxMembersNum)) {
      Alert.alert(t(language, "errors.missingFields"));
      return;
    }
    setLoading(true);
    const res = await api.createCircle({
      name: circleForm.name,
      amount: amountNum,
      frequency: circleForm.frequency,
      maxMembers: maxMembersNum,
    });
    setLoading(false);

    if (res.success) {
      setShowCreateCircle(false);
      setCircleForm({ name: "", amount: "", frequency: "weekly", maxMembers: "5" });
      refreshData();
      Alert.alert(t(language, "confirmations.circleCreated"));
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleJoinCircle = async () => {
    if (!joinInviteCode) return;
    setLoading(true);
    const res = await api.joinCircleByCode(joinInviteCode);
    setLoading(false);

    if (res.success) {
      setShowJoinCircle(false);
      setJoinInviteCode("");
      refreshData();
      Alert.alert(t(language, "confirmations.circleJoined"));
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleInviteMember = async () => {
    if (!adminCircleTarget || !adminInvitePhone) return;
    setLoading(true);
    const res = await api.inviteMemberByPhone(adminCircleTarget.id, adminInvitePhone);
    setLoading(false);
    if (res.success) {
      setAdminInvitePhone("");
      Alert.alert(language === "fr" ? "Membre invité avec succès !" : "Member successfully invited!");
      // Recharger le détail pour actualiser les membres du modal
      const detailRes = await api.getCircleDetail(adminCircleTarget.id);
      if (detailRes.success) {
        setAdminCircleTarget(detailRes.data);
      }
      refreshData();
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleUpdateCircleName = async () => {
    if (!adminCircleTarget || !adminCircleName) return;
    setLoading(true);
    const res = await api.updateCircle(adminCircleTarget.id, { name: adminCircleName });
    setLoading(false);
    if (res.success) {
      Alert.alert(language === "fr" ? "Nom de la tontine modifié !" : "Tontine name updated!");
      // Recharger le détail
      const detailRes = await api.getCircleDetail(adminCircleTarget.id);
      if (detailRes.success) {
        setAdminCircleTarget(detailRes.data);
      }
      refreshData();
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleOpenAdminCircle = async (circle: any) => {
    setLoading(true);
    const res = await api.getCircleDetail(circle.id);
    setLoading(false);
    if (res.success) {
      setAdminCircleTarget(res.data);
      setAdminCircleName(res.data.name);
      setAdminInvitePhone("");
      setShowAdminCircle(true);
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleCircleContribute = async (circleId: string) => {
    const circle = circles.find((c) => c.id === circleId);
    if (!circle) return;
    setContributeType("circle");
    setContributeTargetId(circleId);
    setContributeAmount(circle.amount.toString());
    setContributeMethod("tmoney");
    setShowContributeModal(true);
  };

  // ─── EPARGNE ACTIONS ───────────────────────────────────────

  const handleCreatePot = async () => {
    const targetNum = parseInt(potForm.targetAmount);
    const fixedNum = parseInt(potForm.fixedAmount);
    if (!potForm.name || isNaN(targetNum)) {
      Alert.alert(t(language, "errors.missingFields"));
      return;
    }
    setLoading(true);
    const res = await api.createPot({
      name: potForm.name,
      targetAmount: targetNum,
      mode: potForm.mode as "free" | "fixed",
      frequency: potForm.mode === "fixed" ? potForm.frequency : undefined,
      fixedAmount: potForm.mode === "fixed" ? fixedNum : undefined,
      isLocked: potForm.isLocked,
    });
    setLoading(false);

    if (res.success) {
      setShowCreatePot(false);
      setPotForm({ name: "", targetAmount: "", mode: "free", frequency: "weekly", fixedAmount: "", isLocked: false });
      refreshData();
      Alert.alert(t(language, "confirmations.potCreated"));
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handlePotContribute = async (potId: string) => {
    const pot = pots.find((p) => p.id === potId);
    if (!pot) return;
    setContributeType("pot");
    setContributeTargetId(potId);
    setContributeAmount(pot.mode === "fixed" ? (pot.fixedAmount || "").toString() : "");
    setContributeMethod("tmoney");
    setShowContributeModal(true);
  };

  const handleConfirmContribute = async () => {
    const amountNum = parseInt(contributeAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert(language === "fr" ? "Montant invalide" : "Invalid amount");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (contributeType === "circle") {
        console.log(`Initiating circle contribution of ${amountNum} FCFA via ${contributeMethod}...`);
        res = await api.initiateCircleContribution(contributeTargetId);
      } else {
        console.log(`Initiating pot contribution of ${amountNum} FCFA via ${contributeMethod}...`);
        res = await api.initiatePotContribution(contributeTargetId, amountNum);
      }
      setLoading(false);

      if (res.success) {
        setShowContributeModal(false);
        const methodLabels: Record<string, string> = {
          tmoney: "Mixx by Yas (T-Money)",
          moov: "Moov Money",
          bank: "Transfert bancaire",
          visa: "Carte Visa",
        };
        const selectedMethodName = methodLabels[contributeMethod];
        
        Alert.alert(
          language === "fr" ? "Paiement initié !" : "Payment initiated!",
          language === "fr" 
            ? `Votre versement de ${amountNum} FCFA via ${selectedMethodName} est en cours. Une confirmation vous sera notifiée sous peu.`
            : `Your payment of ${amountNum} FCFA via ${selectedMethodName} is processing. You will receive a confirmation shortly.`
        );
        
        // Rafraîchir les données après confirmation simulée
        setTimeout(refreshData, 3500);
      } else {
        Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
      }
    } catch (e) {
      setLoading(false);
      Alert.alert(language === "fr" ? "Erreur de connexion" : "Connection Error");
    }
  };

  const handlePotWithdraw = async (potId: string) => {
    setLoading(true);
    const res = await api.withdrawPot(potId);
    setLoading(false);

    if (res.success) {
      Alert.alert(t(language, "confirmations.potWithdrawal"));
      refreshData();
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  // ─── CARTE ACTIONS ─────────────────────────────────────────

  const handleRequestCard = async (type: "virtual" | "physical") => {
    setLoading(true);
    const res = await api.requestCard(type);
    setLoading(false);

    if (res.success) {
      Alert.alert(language === "fr" ? "Carte commandée !" : "Card ordered!", `**** **** **** ${res.data.lastFour}`);
      refreshData();
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  const handleToggleCardStatus = async (cardId: string, currentStatus: string) => {
    setLoading(true);
    let res;
    if (currentStatus === "inactive") {
      res = await api.activateCard(cardId);
    } else if (currentStatus === "active") {
      res = await api.blockCard(cardId);
    } else {
      res = await api.unblockCard(cardId);
    }
    setLoading(false);

    if (res.success) {
      refreshData();
    } else {
      Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
    }
  };

  // ─── RENDERS — ONBOARDING SCREEN ───────────────────────────

  const renderOnboarding = () => {
    const slides = [
      {
        title: language === "fr" ? "Tontines Digitalisées" : "Digitalized Tontines",
        desc: language === "fr" ? "Épargnez ensemble, sans risque et à votre rythme avec vos proches." : "Save together, risk-free and at your own pace with your family.",
        ill: <Onboarding1 />,
      },
      {
        title: language === "fr" ? "Bols d'Épargne" : "Savings Pots",
        desc: language === "fr" ? "Atteignez vos projets (scolarité, commerce, imprévus) de façon disciplinée." : "Reach your projects (schooling, trade, emergencies) in a disciplined way.",
        ill: <Onboarding2 />,
      },
      {
        title: language === "fr" ? "Carte Visa & Score" : "Visa Card & Score",
        desc: language === "fr" ? "Gagnez des points avec vos tontines et débloquez votre Carte Visa virtuelle Egoto." : "Earn points with your tontines and unlock your virtual Egoto Visa Card.",
        ill: <Onboarding3 />,
      },
    ];

    const currentSlide = slides[onboardingIndex];

    return (
      <SafeAreaView style={styles.fullscreen}>
        {/* Language select on top */}
        <View style={styles.langBar}>
          <TouchableOpacity onPress={() => setLanguage("fr")} style={language === "fr" && styles.langActive}>
            <Text style={[styles.langText, language === "fr" && styles.langTextActive]}>FR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage("en")} style={language === "en" && styles.langActive}>
            <Text style={[styles.langText, language === "en" && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.onboardSlide}>
          <View style={styles.onboardIll}>{currentSlide.ill}</View>
          <Text style={styles.onboardTitle}>{currentSlide.title}</Text>
          <Text style={styles.onboardDesc}>{currentSlide.desc}</Text>
        </View>

        {/* Footer controls */}
        <View style={styles.onboardFooter}>
          {/* Dots */}
          <View style={styles.dotsRow}>
            {slides.map((_, idx) => (
              <View key={idx} style={[styles.dot, onboardingIndex === idx && styles.dotActive]} />
            ))}
          </View>

          {/* Button */}
          <Button
            title={onboardingIndex === 2 ? (language === "fr" ? "Commencer" : "Get Started") : (language === "fr" ? "Suivant" : "Next")}
            onPress={() => {
              if (onboardingIndex < 2) {
                setOnboardingIndex(onboardingIndex + 1);
              } else {
                setCurrentScreen("auth");
              }
            }}
            style={styles.onboardBtn}
          />
        </View>
      </SafeAreaView>
    );
  };

  // ─── RENDERS — AUTHENTICATION SCREEN ───────────────────────

  const renderAuth = () => {
    return (
      <SafeAreaView style={styles.fullscreen}>
        <ScrollView contentContainerStyle={styles.authScroll}>
          <View style={styles.authHero}>
            <Text style={styles.brandTitle}>Egoto</Text>
            <Text style={styles.brandSubtitle}>Tontines & Épargne au Togo</Text>
          </View>

          <GlassCard style={styles.authCard}>
            {authStep === "phone" && (
              <>
                <Text style={styles.cardHeader}>{language === "fr" ? "Identifiez-vous" : "Identify Yourself"}</Text>
                <Input
                  label={language === "fr" ? "Numéro de téléphone" : "Phone Number"}
                  placeholder="+228 90 00 00 00"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <Button title={language === "fr" ? "Continuer" : "Continue"} onPress={handlePhoneCheck} loading={loading} />
              </>
            )}

            {authStep === "login" && (
              <>
                <Text style={styles.cardHeader}>{language === "fr" ? "De retour !" : "Welcome Back"}</Text>
                <Text style={styles.cardSubtitle}>{phone}</Text>
                <Input
                  label="PIN"
                  placeholder="••••"
                  value={pin}
                  onChangeText={setPin}
                  secureTextEntry
                  keyboardType="numeric"
                />
                <Button title={language === "fr" ? "Se connecter" : "Log In"} onPress={handleLogin} loading={loading} />
                <TouchableOpacity onPress={() => setAuthStep("phone")} style={styles.backLink}>
                  <Text style={styles.backLinkText}>{language === "fr" ? "Changer de numéro" : "Change phone number"}</Text>
                </TouchableOpacity>
              </>
            )}

            {authStep === "register" && (
              <>
                <Text style={styles.cardHeader}>{language === "fr" ? "Créer un compte" : "Create Account"}</Text>
                <Text style={styles.cardSubtitle}>{phone}</Text>
                <Input
                  label={language === "fr" ? "Prénom" : "First Name"}
                  placeholder="Kofi"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <Input
                  label={language === "fr" ? "Nom" : "Last Name"}
                  placeholder="Mensah"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <Input
                  label={language === "fr" ? "Créer un PIN à 4 chiffres" : "Create a 4-digit PIN"}
                  placeholder="••••"
                  value={pin}
                  onChangeText={setPin}
                  secureTextEntry
                  keyboardType="numeric"
                />
                <Button title={language === "fr" ? "S'enregistrer" : "Register"} onPress={handleRegister} loading={loading} />
                <TouchableOpacity onPress={() => setAuthStep("phone")} style={styles.backLink}>
                  <Text style={styles.backLinkText}>{language === "fr" ? "Changer de numéro" : "Change phone number"}</Text>
                </TouchableOpacity>
              </>
            )}
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ─── RENDERS — MAIN APP SCREEN ─────────────────────────────

  const renderMain = () => {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {/* Top Header */}
        <View style={styles.headerBar}>
          <Text style={styles.headerBrand}>Egoto</Text>
          <TouchableOpacity onPress={refreshData}>
            <Text style={styles.refreshText}>{language === "fr" ? "Actualiser" : "Refresh"}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.mainScroll}>
          {activeTab === "home" && renderTabHome()}
          {activeTab === "circles" && renderTabCircles()}
          {activeTab === "pots" && renderTabPots()}
          {activeTab === "cards" && renderTabCards()}
          {activeTab === "profile" && renderTabProfile()}
        </ScrollView>

        {/* Liquid glass-like bottom tabs */}
        <GlassCard style={styles.tabBar} intensity={50}>
          <View style={styles.tabRow}>
            {/* Tab 1 */}
            <TouchableOpacity onPress={() => setActiveTab("home")} style={styles.tabButton}>
              <HomeIcon color={activeTab === "home" ? COLORS.primary : COLORS.textGray} size={22} />
              <Text style={[styles.tabLabelSub, activeTab === "home" && styles.tabLabelSubActive]}>{language === "fr" ? "Accueil" : "Home"}</Text>
            </TouchableOpacity>

            {/* Tab 2 */}
            <TouchableOpacity onPress={() => setActiveTab("circles")} style={styles.tabButton}>
              <CirclesIcon color={activeTab === "circles" ? COLORS.primary : COLORS.textGray} size={22} />
              <Text style={[styles.tabLabelSub, activeTab === "circles" && styles.tabLabelSubActive]}>{language === "fr" ? "Tontines" : "Circles"}</Text>
            </TouchableOpacity>

            {/* Tab 3 */}
            <TouchableOpacity onPress={() => setActiveTab("pots")} style={styles.tabButton}>
              <PotsIcon color={activeTab === "pots" ? COLORS.primary : COLORS.textGray} size={22} />
              <Text style={[styles.tabLabelSub, activeTab === "pots" && styles.tabLabelSubActive]}>{language === "fr" ? "Bols" : "Pots"}</Text>
            </TouchableOpacity>

            {/* Tab 4 */}
            <TouchableOpacity onPress={() => setActiveTab("cards")} style={styles.tabButton}>
              <CardsIcon color={activeTab === "cards" ? COLORS.primary : COLORS.textGray} size={22} />
              <Text style={[styles.tabLabelSub, activeTab === "cards" && styles.tabLabelSubActive]}>{language === "fr" ? "Cartes" : "Cards"}</Text>
            </TouchableOpacity>

            {/* Tab 5 */}
            <TouchableOpacity onPress={() => setActiveTab("profile")} style={styles.tabButton}>
              <ProfileIcon color={activeTab === "profile" ? COLORS.primary : COLORS.textGray} size={22} />
              <Text style={[styles.tabLabelSub, activeTab === "profile" && styles.tabLabelSubActive]}>{language === "fr" ? "Profil" : "Profile"}</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Modals for creation */}
        {renderModals()}
      </SafeAreaView>
    );
  };

  // ─── TABS ──────────────────────────────────────────────────

  // Tab 1: Accueil / Dashboard
  const renderTabHome = () => {
    const totalPotsSaved = pots.reduce((sum, p) => sum + p.currentAmount, 0);

    return (
      <View style={styles.tabContent}>
        {/* Welcome card */}
        <GlassCard style={styles.dashboardHero}>
          <Text style={styles.heroGreeting}>Miapé lolo / {language === "fr" ? "Salut" : "Hello"}, {profile?.firstName}</Text>
          <Text style={styles.heroScoreLabel}>{language === "fr" ? "Score Egoto" : "Egoto Score"}</Text>
          <Text style={styles.heroScoreValue}>{scoreInfo?.score ?? 0} pts</Text>
          <Text style={styles.heroTier}>Palier : {scoreInfo ? t(language, `scoreTiers.${scoreInfo.tier}`) : "Débutant"}</Text>
        </GlassCard>

        {/* Savings overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{language === "fr" ? "Mes Épargnes" : "My Savings"}</Text>
        </View>

        <View style={styles.homeStatsRow}>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statLabel}>{language === "fr" ? "Bols d'épargne" : "Savings pots"}</Text>
            <Text style={styles.statValue}>{totalPotsSaved} FCFA</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Text style={styles.statLabel}>{language === "fr" ? "Tontines actives" : "Active tontines"}</Text>
            <Text style={styles.statValue}>{circles.length}</Text>
          </GlassCard>
        </View>

        {/* Call to action onboarding style for empty lists */}
        {circles.length === 0 && pots.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <EmptyState />
            <Text style={styles.emptyStateText}>{language === "fr" ? "Aucune tontine ni bol d'épargne. C'est le moment de commencer !" : "No tontines or savings pots yet. Time to start!"}</Text>
            <View style={styles.emptyActions}>
              <Button title={language === "fr" ? "Créer un cercle" : "Create circle"} onPress={() => setShowCreateCircle(true)} style={styles.actionBtn} />
              <Button title={language === "fr" ? "Créer un bol" : "Create pot"} onPress={() => setShowCreatePot(true)} variant="secondary" style={styles.actionBtn} />
            </View>
          </View>
        )}
      </View>
    );
  };

  // Tab 2: Cercles / Tontines
  const renderTabCircles = () => {
    return (
      <View style={styles.tabContent}>
        <View style={styles.tabHeaderRow}>
          <Text style={styles.sectionTitle}>{language === "fr" ? "Cercles de tontine" : "Tontine Circles"}</Text>
          <View style={styles.rowActions}>
            <TouchableOpacity onPress={() => setShowJoinCircle(true)} style={styles.headerIconBtn}>
              <Text>{language === "fr" ? "Rejoindre" : "Join"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCreateCircle(true)} style={styles.headerIconBtn}>
              <Text>{language === "fr" ? "Créer" : "Create"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {circles.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState />
            <Text style={styles.emptyStateText}>{language === "fr" ? "Vous ne faites partie d'aucune tontine pour le moment." : "You are not in any tontine circle right now."}</Text>
          </View>
        ) : (
          circles.map((c) => {
            const isFull = c._count.members === c.maxMembers;
            const isAdmin = c.createdById === profile?.id;
            return (
              <GlassCard key={c.id} style={styles.listItemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{c.name}</Text>
                  <Text style={styles.itemBadge}>{c.amount} FCFA</Text>
                </View>
                <Text style={styles.itemDetail}>{language === "fr" ? "Fréquence :" : "Frequency:"} {t(language, `labels.${c.frequency}`)} • {language === "fr" ? "Membres :" : "Members:"} {c._count.members}/{c.maxMembers}</Text>
                <Text style={styles.itemSubDetail}>{t(language, "labels.inviteCode")} : {c.inviteCode || ""}</Text>
                
                <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                  <Button
                    title={isFull 
                      ? (language === "fr" ? "Cotiser maintenant" : "Contribute now") 
                      : (language === "fr" ? `En attente (${c._count.members}/${c.maxMembers})` : `Waiting (${c._count.members}/${c.maxMembers})`)}
                    onPress={() => isFull && handleCircleContribute(c.id)}
                    style={StyleSheet.flatten([styles.itemActionBtn, { flex: 1, opacity: isFull ? 1 : 0.6 }])}
                  />
                  {isAdmin && (
                    <Button
                      title={language === "fr" ? "Gérer" : "Manage"}
                      variant="secondary"
                      onPress={() => handleOpenAdminCircle(c)}
                      style={StyleSheet.flatten([styles.itemActionBtn, { width: 90 }])}
                    />
                  )}
                </View>
              </GlassCard>
            );
          })
        )}
      </View>
    );
  };

  // Tab 3: Bols d'épargne
  const renderTabPots = () => {
    return (
      <View style={styles.tabContent}>
        <View style={styles.tabHeaderRow}>
          <Text style={styles.sectionTitle}>{language === "fr" ? "Bols d'Épargne" : "Savings Pots"}</Text>
          <TouchableOpacity onPress={() => setShowCreatePot(true)} style={styles.headerIconBtn}>
            <Text>{language === "fr" ? "Créer un bol" : "Create pot"}</Text>
          </TouchableOpacity>
        </View>

        {pots.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState />
            <Text style={styles.emptyStateText}>{language === "fr" ? "Créez votre premier bol d'épargne individuel." : "Create your first individual savings pot."}</Text>
          </View>
        ) : (
          pots.map((p) => {
            const progress = p.targetAmount > 0 ? p.currentAmount / p.targetAmount : 0;
            const progressPercentage = Math.round(progress * 100);
            return (
              <GlassCard key={p.id} style={styles.listItemCard}>
                <View style={styles.itemHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <Text style={styles.itemTitle}>{p.name}</Text>
                    <View style={{ marginLeft: 8 }}>
                      {p.isLocked ? <LockIcon size={16} /> : <UnlockIcon size={16} />}
                    </View>
                  </View>
                  <Text style={styles.itemBadge}>{p.currentAmount} / {p.targetAmount} FCFA</Text>
                </View>
                <Text style={styles.progressText}>{progressPercentage}% {language === "fr" ? "atteint" : "reached"}</Text>
                <ProgressBar progress={progress} style={styles.potProgress} />
                <View style={styles.potActionsRow}>
                  <Button title={language === "fr" ? "Épargner" : "Save"} onPress={() => handlePotContribute(p.id)} style={styles.potActionBtn} />
                  <Button
                    title={language === "fr" ? "Retirer" : "Withdraw"}
                    onPress={() => handlePotWithdraw(p.id)}
                    variant="secondary"
                    style={styles.potActionBtn}
                  />
                </View>
              </GlassCard>
            );
          })
        )}
      </View>
    );
  };

  // Tab 4: Carte Visa & Score
  const renderTabCards = () => {
    return (
      <View style={styles.tabContent}>
        {/* Score Jauge / Progress */}
        <GlassCard style={styles.scoreJaugeCard}>
          <Text style={styles.sectionTitle}>{language === "fr" ? "Score Egoto" : "Egoto Score"}</Text>
          <Text style={styles.scoreNumber}>{scoreInfo?.score ?? 0} <Text style={styles.scoreMax}>/ 1000</Text></Text>
          <Text style={styles.scoreProgressText}>
            {scoreInfo?.nextTier
              ? (language === "fr" ? `Plus que ${scoreInfo.pointsToNext} points pour débloquer : ${t(language, `scoreTiers.${scoreInfo.nextTier}`)}` : `Only ${scoreInfo.pointsToNext} points left to unlock: ${t(language, `scoreTiers.${scoreInfo.nextTier}`)}`)
              : (language === "fr" ? "Tous les paliers débloqués !" : "All tiers unlocked!")}
          </Text>
        </GlassCard>

        {/* Active Visa Cards */}
        <View style={styles.tabHeaderRow}>
          <Text style={styles.sectionTitle}>{language === "fr" ? "Mes cartes Visa Egoto" : "My Egoto Visa Cards"}</Text>
        </View>

        {cards.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>{language === "fr" ? "Vous n'avez pas encore de carte. Commandez votre carte ci-dessous." : "You don't have any cards yet. Request your card below."}</Text>
            <View style={styles.cardActions}>
              <Button title={language === "fr" ? "Demander carte virtuelle" : "Request virtual card"} onPress={() => handleRequestCard("virtual")} style={styles.actionBtn} />
              <Button title={language === "fr" ? "Demander carte physique" : "Request physical card"} onPress={() => handleRequestCard("physical")} variant="secondary" style={styles.actionBtn} />
            </View>
          </View>
        ) : (
          cards.map((c) => (
            <GlassCard key={c.id} style={StyleSheet.flatten([styles.cardItem, c.tier === "gold" ? styles.cardGold : {}])}>
              <Text style={StyleSheet.flatten([styles.cardTierText, c.tier === "gold" ? styles.textGold : {}])}>Visa {c.tier === "gold" ? "GOLD" : "STANDARD"}</Text>
              <Text style={styles.cardTypeLabel}>{c.type === "virtual" ? (language === "fr" ? "Virtuelle" : "Virtual") : (language === "fr" ? "Physique" : "Physical")}</Text>
              <Text style={styles.cardNumberText}>**** **** **** {c.lastFour}</Text>
              <View style={styles.cardFooterRow}>
                <Text style={styles.cardStatusLabel}>Statut : {t(language, `status.${c.status}`)}</Text>
                <TouchableOpacity onPress={() => handleToggleCardStatus(c.id, c.status)} style={styles.cardToggleBtn}>
                  <Text style={styles.cardToggleText}>
                    {c.status === "inactive" ? (language === "fr" ? "Activer" : "Activate") : (c.status === "active" ? (language === "fr" ? "Bloquer" : "Block") : (language === "fr" ? "Débloquer" : "Unblock"))}
                  </Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          ))
        )}
      </View>
    );
  };

  // Tab 5: Profil
  const renderTabProfile = () => {
    return (
      <View style={styles.tabContent}>
        <GlassCard style={styles.profileCard}>
          <Text style={styles.profileName}>{profile?.firstName} {profile?.lastName}</Text>
          <Text style={styles.profilePhone}>{profile?.phone}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.settingsHeader}>{language === "fr" ? "Préférences" : "Settings"}</Text>
          
          {/* Langue toggle */}
          <View style={styles.settingsRow}>
            <Text style={styles.settingLabel}>{language === "fr" ? "Langue" : "Language"}</Text>
            <View style={styles.langToggleGroup}>
              <TouchableOpacity onPress={() => setLanguage("fr")} style={[styles.langBtn, language === "fr" && styles.langBtnActive]}>
                <Text style={[styles.langBtnText, language === "fr" && styles.langBtnTextActive]}>FR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage("en")} style={[styles.langBtn, language === "en" && styles.langBtnActive]}>
                <Text style={[styles.langBtnText, language === "en" && styles.langBtnTextActive]}>EN</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title={language === "fr" ? "Se déconnecter" : "Log Out"}
            onPress={() => {
              setToken(null);
              setProfile(null);
              setCurrentScreen("auth");
            }}
            variant="danger"
            style={styles.logoutBtn}
          />
        </GlassCard>
      </View>
    );
  };

  // ─── CREATION MODALS ───────────────────────────────────────

  const renderModals = () => {
    return (
      <>
        {/* Create Circle Modal */}
        <Modal visible={showCreateCircle} animationType="slide" transparent>
          <View style={styles.modalBg}>
            <GlassCard style={styles.modalCard} intensity={90}>
              <Text style={styles.modalTitle}>{language === "fr" ? "Créer un cercle de tontine" : "Create Tontine Circle"}</Text>
              <Input
                label={language === "fr" ? "Nom du cercle" : "Circle Name"}
                placeholder="Tontine Adawlato"
                value={circleForm.name}
                onChangeText={(text) => setCircleForm({ ...circleForm, name: text })}
              />
              <Input
                label={language === "fr" ? "Montant par tour (FCFA)" : "Amount per round (FCFA)"}
                placeholder="10000"
                value={circleForm.amount}
                onChangeText={(text) => setCircleForm({ ...circleForm, amount: text })}
                keyboardType="numeric"
              />
              {/* Frequency selection */}
              <Text style={styles.inputLabel}>{language === "fr" ? "Fréquence de rotation" : "Rotation Frequency"}</Text>
              <View style={styles.freqRow}>
                {["weekly", "biweekly", "monthly"].map((f) => (
                  <TouchableOpacity
                    key={f}
                    onPress={() => setCircleForm({ ...circleForm, frequency: f })}
                    style={[styles.freqBtn, circleForm.frequency === f && styles.freqBtnActive]}
                  >
                    <Text style={[styles.freqBtnText, circleForm.frequency === f && styles.freqBtnTextActive]}>{t(language, `labels.${f}`)}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Input
                label={language === "fr" ? "Nombre max de membres" : "Max Members"}
                placeholder="5"
                value={circleForm.maxMembers}
                onChangeText={(text) => setCircleForm({ ...circleForm, maxMembers: text })}
                keyboardType="numeric"
              />

              <View style={styles.modalActions}>
                <Button title={language === "fr" ? "Fermer" : "Close"} onPress={() => setShowCreateCircle(false)} variant="secondary" style={styles.modalAction} />
                <Button title={language === "fr" ? "Créer" : "Create"} onPress={handleCreateCircle} style={styles.modalAction} />
              </View>
            </GlassCard>
          </View>
        </Modal>

        {/* Join Circle Modal */}
        <Modal visible={showJoinCircle} animationType="slide" transparent>
          <View style={styles.modalBg}>
            <GlassCard style={styles.modalCard} intensity={90}>
              <Text style={styles.modalTitle}>{language === "fr" ? "Rejoindre une tontine" : "Join Tontine Circle"}</Text>
              <Input
                label={t(language, "labels.inviteCode")}
                placeholder="ex: T3B7F"
                value={joinInviteCode}
                onChangeText={(text) => setJoinInviteCode(text.toUpperCase())}
              />
              <View style={styles.modalActions}>
                <Button title={language === "fr" ? "Fermer" : "Close"} onPress={() => setShowJoinCircle(false)} variant="secondary" style={styles.modalAction} />
                <Button title={language === "fr" ? "Rejoindre" : "Join"} onPress={handleJoinCircle} style={styles.modalAction} />
              </View>
            </GlassCard>
          </View>
        </Modal>

        {/* Create Pot Modal */}
        <Modal visible={showCreatePot} animationType="slide" transparent>
          <View style={styles.modalBg}>
            <GlassCard style={styles.modalCard} intensity={90}>
              <Text style={styles.modalTitle}>{language === "fr" ? "Créer un bol d'épargne" : "Create Savings Pot"}</Text>
              <Input
                label={language === "fr" ? "Nom de l'épargne" : "Pot Name"}
                placeholder="Moto"
                value={potForm.name}
                onChangeText={(text) => setPotForm({ ...potForm, name: text })}
              />
              <Input
                label={language === "fr" ? "Montant objectif (FCFA)" : "Target Amount (FCFA)"}
                placeholder="200000"
                value={potForm.targetAmount}
                onChangeText={(text) => setPotForm({ ...potForm, targetAmount: text })}
                keyboardType="numeric"
              />
              {/* Mode Selection */}
              <Text style={styles.inputLabel}>{language === "fr" ? "Mode d'épargne" : "Savings Mode"}</Text>
              <View style={styles.freqRow}>
                <TouchableOpacity
                  onPress={() => setPotForm({ ...potForm, mode: "free" })}
                  style={[styles.freqBtn, potForm.mode === "free" && styles.freqBtnActive]}
                >
                  <Text style={[styles.freqBtnText, potForm.mode === "free" && styles.freqBtnTextActive]}>{language === "fr" ? "Libre" : "Free"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPotForm({ ...potForm, mode: "fixed" })}
                  style={[styles.freqBtn, potForm.mode === "fixed" && styles.freqBtnActive]}
                >
                  <Text style={[styles.freqBtnText, potForm.mode === "fixed" && styles.freqBtnTextActive]}>{language === "fr" ? "Programmé" : "Programmed"}</Text>
                </TouchableOpacity>
              </View>

              {potForm.mode === "fixed" && (
                <>
                  <Input
                    label={language === "fr" ? "Montant fixe par versement (FCFA)" : "Fixed Amount per payment (FCFA)"}
                    placeholder="10000"
                    value={potForm.fixedAmount}
                    onChangeText={(text) => setPotForm({ ...potForm, fixedAmount: text })}
                    keyboardType="numeric"
                  />
                  <Text style={styles.inputLabel}>{language === "fr" ? "Fréquence des versements" : "Frequency"}</Text>
                  <View style={styles.freqRow}>
                    {["weekly", "biweekly", "monthly"].map((f) => (
                      <TouchableOpacity
                        key={f}
                        onPress={() => setPotForm({ ...potForm, frequency: f })}
                        style={[styles.freqBtn, potForm.frequency === f && styles.freqBtnActive]}
                      >
                        <Text style={[styles.freqBtnText, potForm.frequency === f && styles.freqBtnTextActive]}>{t(language, `labels.${f}`)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {/* Lock account toggle */}
              <TouchableOpacity
                onPress={() => setPotForm({ ...potForm, isLocked: !potForm.isLocked })}
                style={[styles.lockToggleRow, { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }]}
              >
                {potForm.isLocked ? <LockIcon size={18} color={COLORS.accent} /> : <UnlockIcon size={18} color={COLORS.primary} />}
                <Text style={styles.lockToggleText}>
                  {potForm.isLocked 
                    ? (language === "fr" ? "Épargne bloquée (retrait restreint)" : "Locked account") 
                    : (language === "fr" ? "Retrait libre (accès flexible)" : "Unlocked account")}
                </Text>
              </TouchableOpacity>

              <View style={styles.modalActions}>
                <Button title={language === "fr" ? "Fermer" : "Close"} onPress={() => setShowCreatePot(false)} variant="secondary" style={styles.modalAction} />
                <Button title={language === "fr" ? "Créer" : "Create"} onPress={handleCreatePot} style={styles.modalAction} />
              </View>
            </GlassCard>
          </View>
        </Modal>

        {/* Contribute Modal */}
        <Modal visible={showContributeModal} animationType="slide" transparent>
          <View style={styles.modalBg}>
            <GlassCard style={styles.modalCard} intensity={90}>
              <Text style={styles.modalTitle}>
                {contributeType === "circle" 
                  ? (language === "fr" ? "Cotiser à la tontine" : "Contribute to Tontine")
                  : (language === "fr" ? "Alimenter mon bol d'épargne" : "Save into Pot")}
              </Text>
              
              <Input
                label={language === "fr" ? "Montant (FCFA)" : "Amount (FCFA)"}
                placeholder="10000"
                value={contributeAmount}
                onChangeText={setContributeAmount}
                keyboardType="numeric"
                style={contributeType === "circle" ? { opacity: 0.7 } : undefined}
              />
              
              <Text style={styles.inputLabel}>
                {language === "fr" ? "Moyen de paiement" : "Payment Method"}
              </Text>
              
              <View style={styles.paymentMethodsGrid}>
                {/* Mixx by Yas */}
                <TouchableOpacity 
                  onPress={() => setContributeMethod("tmoney")}
                  style={[styles.paymentMethodCard, contributeMethod === "tmoney" && styles.paymentMethodCardActive]}
                >
                  <Text style={[styles.paymentMethodTitle, contributeMethod === "tmoney" && styles.paymentMethodTextActive]}>
                    Mixx by Yas
                  </Text>
                  <Text style={styles.paymentMethodSub}>T-Money</Text>
                </TouchableOpacity>

                {/* Moov Money */}
                <TouchableOpacity 
                  onPress={() => setContributeMethod("moov")}
                  style={[styles.paymentMethodCard, contributeMethod === "moov" && styles.paymentMethodCardActive]}
                >
                  <Text style={[styles.paymentMethodTitle, contributeMethod === "moov" && styles.paymentMethodTextActive]}>
                    Moov Money
                  </Text>
                  <Text style={styles.paymentMethodSub}>Mobile Money</Text>
                </TouchableOpacity>

                {/* Transfert Bancaire */}
                <TouchableOpacity 
                  onPress={() => setContributeMethod("bank")}
                  style={[styles.paymentMethodCard, contributeMethod === "bank" && styles.paymentMethodCardActive]}
                >
                  <Text style={[styles.paymentMethodTitle, contributeMethod === "bank" && styles.paymentMethodTextActive]}>
                    Virement
                  </Text>
                  <Text style={styles.paymentMethodSub}>Transfert bancaire</Text>
                </TouchableOpacity>

                {/* Carte Visa */}
                <TouchableOpacity 
                  onPress={() => setContributeMethod("visa")}
                  style={[styles.paymentMethodCard, contributeMethod === "visa" && styles.paymentMethodCardActive]}
                >
                  <Text style={[styles.paymentMethodTitle, contributeMethod === "visa" && styles.paymentMethodTextActive]}>
                    Carte VISA
                  </Text>
                  <Text style={styles.paymentMethodSub}>Tout type de carte</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalActions}>
                <Button 
                  title={language === "fr" ? "Annuler" : "Cancel"} 
                  onPress={() => setShowContributeModal(false)} 
                  variant="secondary" 
                  style={styles.modalAction} 
                />
                <Button 
                  title={language === "fr" ? "Confirmer le paiement" : "Confirm Payment"} 
                  onPress={handleConfirmContribute} 
                  style={styles.modalAction} 
                />
              </View>
            </GlassCard>
          </View>
        </Modal>

        {/* Admin Circle Modal */}
        <Modal visible={showAdminCircle} animationType="slide" transparent>
          <View style={styles.modalBg}>
            <GlassCard style={StyleSheet.flatten([styles.modalCard, { maxHeight: "85%", width: "95%" }])} intensity={95}>
              <Text style={styles.modalTitle}>
                {language === "fr" ? "Administration de la tontine" : "Tontine Administration"}
              </Text>
              
              {adminCircleTarget && (
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                  {/* Section 1: Modif Nom */}
                  <View style={{ marginBottom: 16 }}>
                    <Input
                      label={language === "fr" ? "Nom de la tontine" : "Tontine Name"}
                      value={adminCircleName}
                      onChangeText={setAdminCircleName}
                      placeholder={adminCircleTarget.name}
                    />
                    <Button 
                      title={language === "fr" ? "Enregistrer les modifications" : "Save Changes"}
                      onPress={handleUpdateCircleName}
                      style={{ marginTop: 8 }}
                    />
                  </View>

                  {/* Section 2: Code d'accès unique */}
                  <View style={{ marginBottom: 20, padding: 12, borderRadius: 8, backgroundColor: "rgba(255, 255, 255, 0.08)", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.6)", marginBottom: 4 }}>
                      {language === "fr" ? "CODE D'INVITATION (5 CARACTÈRES)" : "INVITATION CODE (5 CHARACTERS)"}
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: "bold", letterSpacing: 3, color: COLORS.accent }}>
                      {adminCircleTarget.inviteCode || "—"}
                    </Text>
                    <Text style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.4)", marginTop: 4, textAlign: "center" }}>
                      {language === "fr" 
                        ? "Partagez ce code avec les participants pour qu'ils rejoignent directement sur l'application ou sur WhatsApp."
                        : "Share this code with participants to let them join directly via the App or WhatsApp."}
                    </Text>
                  </View>

                  {/* Section 3: Inviter un membre */}
                  <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.inputLabel, { marginBottom: 6 }]}>
                      {language === "fr" ? "Inviter directement par numéro" : "Invite directly by phone"}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Input
                          label=""
                          placeholder="+228 90 00 00 00"
                          value={adminInvitePhone}
                          onChangeText={setAdminInvitePhone}
                          style={{ marginVertical: 0 }}
                        />
                      </View>
                      <Button
                        title={language === "fr" ? "Inviter" : "Invite"}
                        onPress={handleInviteMember}
                        style={{ height: 44, width: 80, marginTop: 0 }}
                      />
                    </View>
                  </View>

                  {/* Section 4: Ordre de passage et Liste des membres */}
                  <View style={{ marginBottom: 16 }}>
                    <Text style={[styles.inputLabel, { marginBottom: 8 }]}>
                      {language === "fr" ? "Ordre de passage & Rotation" : "Rotation & Payout Order"}
                    </Text>
                    
                    {adminCircleTarget.members && adminCircleTarget.members.map((m: any) => {
                      const isCurrentRecipient = adminCircleTarget.currentCycle === m.position;
                      return (
                        <View 
                          key={m.id} 
                          style={{ 
                            flexDirection: "row", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            paddingVertical: 10, 
                            borderBottomWidth: 1, 
                            borderBottomColor: "rgba(255, 255, 255, 0.08)" 
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
                              {m.position}. {m.user.firstName} {m.user.lastName} {m.role === "admin" && "👑"}
                            </Text>
                            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                              {m.user.phone}
                            </Text>
                          </View>

                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ 
                              color: isCurrentRecipient ? COLORS.accent : "#fff", 
                              fontWeight: isCurrentRecipient ? "bold" : "normal",
                              fontSize: 13 
                            }}>
                              {language === "fr" ? `Cycle ${m.position}` : `Cycle ${m.position}`}
                            </Text>
                            {isCurrentRecipient && (
                              <Text style={{ color: COLORS.accent, fontSize: 10, fontWeight: "bold" }}>
                                {language === "fr" ? "Bénéficiaire Actuel" : "Current Recipient"}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              )}

              <View style={[styles.modalActions, { marginTop: 12 }]}>
                <Button 
                  title={language === "fr" ? "Fermer" : "Close"} 
                  onPress={() => setShowAdminCircle(false)} 
                  variant="secondary" 
                  style={{ flex: 1 }} 
                />
              </View>
            </GlassCard>
          </View>
        </Modal>
      </>
    );
  };

  // ─── CYCLE DE VIE GENERAL ──────────────────────────────────

  return (
    <View style={styles.root}>
      {currentScreen === "onboarding" && renderOnboarding()}
      {currentScreen === "auth" && renderAuth()}
      {currentScreen === "main" && renderMain()}
    </View>
  );
}

// ─── STYLES GLOBALS ──────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
    justifyContent: "space-between",
  },
  langBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  langText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textGray,
    padding: 6,
  },
  langActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  langTextActive: {
    color: COLORS.primary,
  },
  onboardSlide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  onboardIll: {
    marginBottom: 40,
  },
  onboardTitle: {
    fontFamily: "System",
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    textAlign: "center",
    marginBottom: 16,
  },
  onboardDesc: {
    fontSize: 15,
    color: COLORS.textGray,
    textAlign: "center",
    lineHeight: 22,
  },
  onboardFooter: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
    gap: 24,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2EAE7",
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  onboardBtn: {
    width: "100%",
  },

  // Auth Screen
  authScroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  authHero: {
    alignItems: "center",
    marginBottom: 32,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  brandSubtitle: {
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 4,
  },
  authCard: {
    width: "100%",
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: 16,
  },
  backLink: {
    alignItems: "center",
    marginTop: 16,
  },
  backLinkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },

  // Main Dashboard
  mainContainer: {
    flex: 1,
    backgroundColor: "#F4F7F6",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EBF0EE",
  },
  headerBrand: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  refreshText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  mainScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // leave space for bottom tab bar
  },
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 30,
    padding: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  tabRow: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  tabLabel: {
    fontSize: 20,
    opacity: 0.4,
  },
  tabLabelActive: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  tabLabelSub: {
    fontSize: 10,
    color: COLORS.textGray,
    marginTop: 2,
    fontWeight: "500",
  },
  tabLabelSubActive: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  // Tab - Home
  tabContent: {
    gap: 20,
  },
  dashboardHero: {
    backgroundColor: COLORS.primaryDark,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
  },
  heroGreeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  heroScoreLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 16,
  },
  heroScoreValue: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  heroTier: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "600",
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  homeStatsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statBox: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textGray,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginTop: 6,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EBF0EE",
  },
  emptyStateText: {
    textAlign: "center",
    color: COLORS.textGray,
    fontSize: 14,
    marginTop: 16,
    lineHeight: 20,
  },
  emptyActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    height: 44,
  },

  // Tab - Items list
  tabHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  rowActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerIconBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EBF0EE",
  },
  listItemCard: {
    backgroundColor: "#FFFFFF",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    flex: 1,
  },
  itemBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 12,
  },
  itemDetail: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 6,
  },
  itemSubDetail: {
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 2,
    fontStyle: "italic",
  },
  itemActionBtn: {
    marginTop: 14,
    height: 40,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
    textAlign: "right",
    marginTop: 8,
    marginBottom: 4,
  },
  potProgress: {
    marginBottom: 14,
  },
  potActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  potActionBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
  },

  // Cards & Score Tab
  scoreJaugeCard: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 24,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: 12,
  },
  scoreMax: {
    fontSize: 16,
    color: COLORS.textGray,
    fontWeight: "normal",
  },
  scoreProgressText: {
    fontSize: 13,
    color: COLORS.textGray,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardItem: {
    backgroundColor: COLORS.primary,
    height: 160,
    padding: 20,
    justifyContent: "space-between",
    borderRadius: 16,
  },
  cardGold: {
    backgroundColor: "#202020",
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  cardTierText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  textGold: {
    color: COLORS.accent,
  },
  cardTypeLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  cardNumberText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardStatusLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
  },
  cardToggleBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cardToggleText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardActions: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
    marginTop: 16,
  },

  // Profile Tab
  profileCard: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  profilePhone: {
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#EBF0EE",
    width: "100%",
    marginVertical: 20,
  },
  settingsHeader: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginBottom: 16,
  },
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  langToggleGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EBF0EE",
    borderRadius: 8,
    overflow: "hidden",
  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  langBtnActive: {
    backgroundColor: COLORS.primary,
  },
  langBtnText: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: "bold",
  },
  langBtnTextActive: {
    color: "#FFFFFF",
  },
  logoutBtn: {
    width: "100%",
    marginTop: 10,
  },

  // Modal Views
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalCard: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderRadius: 0,
    backgroundColor: "#FFFFFF",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  modalAction: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 6,
    fontWeight: "500",
  },
  freqRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  freqBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0F4F2",
    justifyContent: "center",
    alignItems: "center",
  },
  freqBtnActive: {
    backgroundColor: COLORS.primary,
  },
  freqBtnText: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  freqBtnTextActive: {
    color: "#FFFFFF",
  },
  lockToggleRow: {
    backgroundColor: "#FDF7EE",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(186, 117, 23, 0.2)",
  },
  lockToggleText: {
    color: COLORS.accent,
    fontWeight: "bold",
    fontSize: 14,
  },
  paymentMethodsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  paymentMethodCard: {
    width: "47%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EBF0EE",
    backgroundColor: "#FFFFFF",
  },
  paymentMethodCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  paymentMethodTextActive: {
    color: COLORS.primary,
  },
  paymentMethodSub: {
    fontSize: 11,
    color: COLORS.textGray,
    marginTop: 4,
  },
});

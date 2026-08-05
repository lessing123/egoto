import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Modal,
  Platform,
  Linking,
  Share,
  Image,
} from "react-native";
import { content, errorMessage, t, Language } from "@egoto/shared";
import { COLORS, SEMANTIC_COLORS, THEME_STATE } from "./src/theme/colors";
import { GlassCard } from "./src/components/GlassCard";
import { Button, Input, ProgressBar } from "./src/components/UI";
import { Logo } from "./src/components/Logo";
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
  ShieldIcon,
  CrownIcon,
  ShareIcon,
  UserPlusIcon,
  CameraIcon,
} from "./src/components/Icons";
import { api, setToken } from "./src/lib/api";

const { width, height: WINDOW_HEIGHT } = Dimensions.get("window");
const isTablet = width > 600;
const tabIconSize = isTablet ? 30 : 22;
const actionIconSize = isTablet ? 26 : 18;
const regularIconSize = isTablet ? 20 : 14;

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
  const [potForm, setPotForm] = useState({ name: "", targetAmount: "", mode: "free", frequency: "weekly", customDays: "", fixedAmount: "", isLocked: false });
  const [joinInviteCode, setJoinInviteCode] = useState("");
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<"forest" | "neon">("forest");

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Safety reinforced profile fields
  const [securityEmail, setSecurityEmail] = useState("");
  const [docType, setDocType] = useState<"cni" | "passport">("cni");
  const [docNumber, setDocNumber] = useState("");
  const [docImage, setDocImage] = useState<string | null>(null);

  // Contribute Modal States
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributeType, setContributeType] = useState<"circle" | "pot">("circle");
  const [contributeTargetId, setContributeTargetId] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");
  const [contributeMethod, setContributeMethod] = useState<"tmoney" | "moov" | "bank" | "visa">("tmoney");

  // Synchronise global shared theme state
  THEME_STATE.isDark = isDarkMode;
  const activeColorSchema = isDarkMode ? SEMANTIC_COLORS.dark : SEMANTIC_COLORS.light;

  const THEME = {
    isDark: isDarkMode,
    bg: activeColorSchema.background,
    cardBg: activeColorSchema.surface,
    cardElevatedBg: activeColorSchema.surfaceElevated,
    cardBorder: activeColorSchema.border,
    primary: activeColorSchema.primary,
    primaryForeground: activeColorSchema.primaryForeground,
    text: activeColorSchema.textPrimary,
    textLight: activeColorSchema.textPrimary,
    textMuted: activeColorSchema.textSecondary,
    inputBg: activeColorSchema.surfaceElevated,
    inputBorder: activeColorSchema.border,
    inputText: activeColorSchema.textPrimary,
    glassBorder: activeColorSchema.border,
    accent: activeColorSchema.accent,
    accentForeground: activeColorSchema.accentForeground,
  };

  const headerBtnPadding = width > 600 ? { paddingVertical: 10, paddingHorizontal: 18 } : { paddingVertical: 6, paddingHorizontal: 12 };
  const headerBtnTextSize = width > 600 ? 15 : 13;

  // Load Initial Session
  useEffect(() => {
    THEME_STATE.isDark = isDarkMode;
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
  }, [isDarkMode]);

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
    let cleanedPhone = phone.replace(/[\s\-\(\)]+/g, "");
    console.log("Original phone:", phone, "Cleaned:", cleanedPhone);
    
    // Si l'utilisateur a tapé uniquement 8 chiffres, on ajoute +228
    if (/^\d{8}$/.test(cleanedPhone)) {
      cleanedPhone = "+228" + cleanedPhone;
    }
    // Si l'utilisateur a commencé par 00228
    if (/^00228\d{8}$/.test(cleanedPhone)) {
      cleanedPhone = "+" + cleanedPhone.substring(2);
    }
    
    if (!/^\+228\d{8}$/.test(cleanedPhone)) {
      console.warn("Invalid phone format:", cleanedPhone);
      Alert.alert(
        language === "fr" ? "Format invalide" : "Invalid format",
        language === "fr" 
          ? "Veuillez entrer un numéro au format +228 suivi de 8 chiffres (ex: +228 90 12 34 56)." 
          : "Please enter a number in the format +228 followed by 8 digits (e.g. +228 90 12 34 56)."
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

  const handleShareCircle = async (inviteCode: string) => {
    const link = `https://egoto.app/join/${inviteCode}`;
    const msg = language === "fr"
      ? `Rejoins ma tontine sur Egoto avec le code d'invitation ${inviteCode} : ${link}`
      : `Join my tontine on Egoto using the invite code ${inviteCode}: ${link}`;
    
    try {
      await Share.share({
        message: msg,
        url: link,
        title: "Invitation Tontine Egoto"
      });
    } catch (error) {
      console.error("Error sharing:", error);
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
    const customDaysNum = parseInt(potForm.customDays);
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
      customDays: potForm.mode === "fixed" && potForm.frequency === "custom" && !isNaN(customDaysNum) ? customDaysNum : undefined,
      fixedAmount: potForm.mode === "fixed" ? fixedNum : undefined,
      isLocked: potForm.isLocked,
    });
    setLoading(false);

    if (res.success) {
      setShowCreatePot(false);
      setPotForm({ name: "", targetAmount: "", mode: "free", frequency: "weekly", customDays: "", fixedAmount: "", isLocked: false });
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
        
        if (contributeMethod === "tmoney") {
          // Lancement USSD T-Money Marchand Mixx by Yas
          const ussdCode = `*145*5*${amountNum}*17711#`;
          Alert.alert(
            language === "fr" ? "Lancement USSD Marchand" : "USSD Merchant Launch",
            language === "fr"
              ? `Egotopay va lancer la composition USSD : ${ussdCode}.\n\nVous n'aurez qu'à entrer votre code secret de paiement T-Money pour valider le dépôt.`
              : `Egotopay is launching the USSD composition: ${ussdCode}.\n\nYou only need to enter your T-Money PIN code to validate the deposit.`,
            [
              {
                text: "OK",
                onPress: async () => {
                  try {
                    const url = `tel:${encodeURIComponent(ussdCode)}`;
                    await Linking.openURL(url);
                  } catch (err) {
                    console.error("Linking USSD error:", err);
                    Alert.alert(
                      language === "fr" ? "Erreur" : "Error",
                      language === "fr"
                        ? `Impossible de composer le code automatiquement. Veuillez composer manuellement : ${ussdCode}`
                        : `Cannot dial automatically. Please dial manually: ${ussdCode}`
                    );
                  }
                }
              }
            ]
          );
        } else {
          Alert.alert(
            language === "fr" ? "Paiement initié !" : "Payment initiated!",
            language === "fr" 
              ? `Votre versement de ${amountNum} FCFA via ${selectedMethodName} est en cours. Une confirmation vous sera notifiée sous peu.`
              : `Your payment of ${amountNum} FCFA via ${selectedMethodName} is processing. You will receive a confirmation shortly.`
          );
        }
        
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
          <TouchableOpacity onPress={() => setLanguage("fr")} style={[language === "fr" ? styles.langActive : {}, language === "fr" && { borderBottomColor: THEME.primary }]}>
            <Text style={[styles.langText, language === "fr" && { color: THEME.primary }]}>FR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage("en")} style={[language === "en" ? styles.langActive : {}, language === "en" && { borderBottomColor: THEME.primary }]}>
            <Text style={[styles.langText, language === "en" && { color: THEME.primary }]}>EN</Text>
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
              <View 
                key={idx} 
                style={[
                  styles.dot, 
                  { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(23, 51, 37, 0.2)" },
                  onboardingIndex === idx && [styles.dotActive, { backgroundColor: THEME.primary }]
                ]} 
              />
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
            <Logo size={80} />
            <Text style={[styles.brandTitle, { color: THEME.text, marginTop: 12 }]}>Egoto</Text>
            <Text style={[styles.brandSubtitle, { color: THEME.textMuted }]}>Tontines & Épargne au Togo</Text>
          </View>

          <GlassCard style={styles.authCard}>
            {authStep === "phone" && (
              <>
                <Text style={[styles.cardHeader, { color: THEME.text }]}>{language === "fr" ? "Identifiez-vous" : "Identify Yourself"}</Text>
                <Input
                  label={language === "fr" ? "Numéro de téléphone" : "Phone Number"}
                  placeholder="90 00 00 00"
                  value={phone}
                  onChangeText={(val) => setPhone(val.replace(/[^0-9]/g, "").slice(0, 8))}
                  keyboardType="numeric"
                  prefix="+228"
                  maxLength={8}
                />
                <Button title={language === "fr" ? "Continuer" : "Continue"} onPress={handlePhoneCheck} loading={loading} />
              </>
            )}

            {authStep === "login" && (
              <>
                <Text style={[styles.cardHeader, { color: THEME.text }]}>{language === "fr" ? "De retour !" : "Welcome Back"}</Text>
                <Text style={[styles.cardSubtitle, { color: THEME.textMuted }]}>{phone}</Text>
                <Input
                  label="PIN"
                  placeholder="••••"
                  value={pin}
                  onChangeText={setPin}
                  secureTextEntry
                  keyboardType="numeric"
                />
                <Button title={language === "fr" ? "Se connecter" : "Log In"} onPress={handleLogin} loading={loading} />
                <TouchableOpacity onPress={() => { setPhone(phone.slice(-8)); setAuthStep("phone"); }} style={styles.backLink}>
                  <Text style={[styles.backLinkText, { color: THEME.primary }]}>{language === "fr" ? "Changer de numéro" : "Change phone number"}</Text>
                </TouchableOpacity>
              </>
            )}

            {authStep === "register" && (
              <>
                <Text style={[styles.cardHeader, { color: THEME.text }]}>{language === "fr" ? "Créer un compte" : "Create Account"}</Text>
                <Text style={[styles.cardSubtitle, { color: THEME.textMuted }]}>{phone}</Text>
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
                <TouchableOpacity onPress={() => { setPhone(phone.slice(-8)); setAuthStep("phone"); }} style={styles.backLink}>
                  <Text style={[styles.backLinkText, { color: THEME.primary }]}>{language === "fr" ? "Changer de numéro" : "Change phone number"}</Text>
                </TouchableOpacity>
              </>
            )}
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ─── RENDERS — ZOOM MODAL CAROUSEL ─────────────────────────
  const renderZoomModal = () => {
    const totalPotsSaved = pots.reduce((sum, p) => sum + p.currentAmount, 0);
    const scoreVal = scoreInfo?.score ?? 0;
    const maxScore = 1000;
    const percentage = Math.min(100, (scoreVal / maxScore) * 100);

    const handleNext = () => {
      setZoomIndex((prev) => (prev + 1) % 4);
    };

    const handlePrev = () => {
      setZoomIndex((prev) => (prev - 1 + 4) % 4);
    };

    const handleAction = () => {
      setShowZoomModal(false);
      if (zoomIndex === 0) {
        setActiveTab("cards");
      } else if (zoomIndex === 1) {
        setActiveTab("profile");
      } else if (zoomIndex === 2) {
        setActiveTab("pots");
      } else if (zoomIndex === 3) {
        setShowCreateCircle(true);
      }
    };

    return (
      <Modal visible={showZoomModal} animationType="fade" transparent>
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setShowZoomModal(false)} 
          style={styles.modalCenterBg}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <GlassCard style={StyleSheet.flatten([styles.modalCard, { maxHeight: WINDOW_HEIGHT * 0.8, width: width > 480 ? 420 : "92%", borderRadius: 28, padding: 20 }])} intensity={98}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: THEME.text }}>
                  {zoomIndex === 0 && (language === "fr" ? "Carte VISA Virtuelle" : "Virtual VISA Card")}
                  {zoomIndex === 1 && (language === "fr" ? "Score de Crédit Egoto" : "Egoto Credit Score")}
                  {zoomIndex === 2 && (language === "fr" ? "Analyse de Performance" : "Activity Analysis")}
                  {zoomIndex === 3 && (language === "fr" ? "Tontines Collectives" : "Collective Circles")}
                </Text>
                <TouchableOpacity onPress={() => setShowZoomModal(false)} style={{ padding: 8 }}>
                  <Text style={{ color: COLORS.textGray, fontSize: 16, fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
              </View>

              {/* Slide Content */}
              <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 12 }}>
                {zoomIndex === 0 && (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <GlassCard style={StyleSheet.flatten([styles.visaCard, { width: "95%", height: 180, marginBottom: 20 }])}>
                      <View style={styles.visaHeader}>
                        <Text style={styles.visaBrand}>Egoto Gold</Text>
                        <View style={styles.visaLogoContainer}>
                          <Text style={styles.visaLogoText}>VISA</Text>
                        </View>
                      </View>
                      <View style={styles.visaBody}>
                        <Text style={styles.visaBalanceLabel}>{language === "fr" ? "SOLDE GLOBAL" : "TOTAL BALANCE"}</Text>
                        <Text style={styles.visaBalanceValue}>{totalPotsSaved.toLocaleString()} FCFA</Text>
                      </View>
                      <View style={styles.visaFooter}>
                        <View>
                          <Text style={styles.visaUser}>{profile?.firstName} {profile?.lastName}</Text>
                          <Text style={styles.visaId}>{profile?.egotoId || "EG-00000"}</Text>
                        </View>
                        <Text style={styles.visaExpiry}>12/29</Text>
                      </View>
                    </GlassCard>
                    <Text style={{ color: THEME.text, fontSize: 14, textAlign: "center", lineHeight: 22, paddingHorizontal: 12, marginBottom: 12 }}>
                      {language === "fr" 
                        ? "Votre carte Egoto Gold regroupe l'ensemble de vos épargnes (Bols d'épargne) en un solde global. Utilisez-la pour vos achats en ligne et vos paiements internationaux."
                        : "Your Egoto Gold card aggregates all your savings (Pots) into a total balance. Use it for online shopping and international payments."}
                    </Text>
                    <Text style={{ color: THEME.textMuted, fontSize: 12, textAlign: "center", fontStyle: "italic" }}>
                      {language === "fr"
                        ? "Disponible dès le palier Standard (200+ points)."
                        : "Unlocked at Standard tier (200+ points)."}
                    </Text>
                  </View>
                )}

                {zoomIndex === 1 && (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={[styles.healthScoreWidget, { width: 140, height: 140, marginBottom: 20 }]}>
                      <View style={[styles.healthArcContainer, { width: 110, height: 110 }]}>
                        <View style={[styles.healthOuterRing, { width: 100, height: 100, borderRadius: 50 }]} />
                        <View style={[styles.healthProgressArc, { width: 100, height: 100, borderRadius: 50, transform: [{ rotate: `${(percentage * 1.8) - 90}deg` }], borderColor: THEME.primary }]} />
                        <View style={styles.healthCenterCircle}>
                          <Text style={[styles.healthScoreNumber, { fontSize: 26, color: THEME.text }]}>{scoreVal}</Text>
                          <Text style={[styles.healthScoreMax, { color: THEME.textMuted }]}>/ {maxScore}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={{ color: COLORS.accent, fontSize: 16, fontWeight: "bold", marginBottom: 12, textTransform: "uppercase" }}>
                      {scoreInfo ? t(language, `scoreTiers.${scoreInfo.tier}`) : "Débutant"}
                    </Text>
                    <Text style={{ color: THEME.text, fontSize: 14, textAlign: "center", lineHeight: 22, paddingHorizontal: 12, marginBottom: 12 }}>
                      {scoreVal < 200 && (language === "fr"
                        ? "Vous êtes actuellement Débutant. Effectuez des versements réguliers sans retard pour augmenter votre score Egoto et débloquer vos cartes."
                        : "You are currently a Beginner. Save regularly on time to increase your score and unlock card products.")}
                      {scoreVal >= 200 && scoreVal < 500 && (language === "fr"
                        ? "Vous êtes Standard. Votre carte virtuelle est active ! Continuez à cotiser pour devenir éligible aux financements des IMF partenaires."
                        : "You are Standard. Your virtual card is active! Keep saving to become eligible for MFI partner loans.")}
                      {scoreVal >= 500 && scoreVal < 600 && (language === "fr"
                        ? "Vous êtes éligible à la mise en relation IMF. Nous pouvons appuyer vos demandes de crédit commercial auprès de nos partenaires financiers."
                        : "You are eligible for MFI referral. We can back your commercial credit requests with our financial partners.")}
                      {scoreVal >= 600 && (language === "fr"
                        ? "Palier Gold atteint ! Vous bénéficiez des meilleurs avantages, plafonds de paiement élevés et d'une carte Gold physique gratuite."
                        : "Gold tier achieved! Benefit from premium features, higher limits, and a free physical Gold Visa card.")}
                    </Text>
                  </View>
                )}

                {zoomIndex === 2 && (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={[styles.performanceWidget, { width: "95%", height: 120, marginBottom: 20 }]}>
                      <View style={styles.chartContainer}>
                        <View style={[styles.chartBar, { height: "35%", backgroundColor: THEME.primary }]} />
                        <View style={[styles.chartBar, { height: "55%", backgroundColor: COLORS.accent }]} />
                        <View style={[styles.chartBar, { height: "75%", backgroundColor: "#FF007F" }]} />
                        <View style={[styles.chartBar, { height: "45%", backgroundColor: THEME.primary }]} />
                        <View style={[styles.chartBar, { height: "90%", backgroundColor: COLORS.success }]} />
                        <View style={[styles.chartBar, { height: "60%", backgroundColor: "#8E00FF" }]} />
                        <View style={[styles.chartBar, { height: "80%", backgroundColor: THEME.primary }]} />
                      </View>
                    </View>
                    <Text style={{ color: COLORS.success, fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>
                      +12.4% {language === "fr" ? "cette semaine" : "this week"}
                    </Text>
                    <Text style={{ color: THEME.text, fontSize: 14, textAlign: "center", lineHeight: 22, paddingHorizontal: 12 }}>
                      {language === "fr"
                        ? "Votre courbe de performance mesure votre réactivité. Chaque versement effectué à temps (bols d'épargne ou tontines collectives) augmente votre niveau d'activité globale."
                        : "Your activity indicator tracks your savings consistency. Every contribution made on time increases your overall health level."}
                    </Text>
                  </View>
                )}

                {zoomIndex === 3 && (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={{ padding: 20, borderRadius: 16, backgroundColor: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(23, 51, 37, 0.04)", width: "95%", alignItems: "center", marginBottom: 20 }}>
                      <Text style={{ color: THEME.text, fontSize: 32, fontWeight: "bold" }}>{circles.length}</Text>
                      <Text style={{ color: THEME.textMuted, fontSize: 13, marginTop: 4 }}>
                        {language === "fr" ? "Tontines Actives rejoints" : "Active Circles joined"}
                      </Text>
                    </View>
                    <Text style={{ color: THEME.text, fontSize: 14, textAlign: "center", lineHeight: 22, paddingHorizontal: 12, marginBottom: 12 }}>
                      {language === "fr"
                        ? "Les tontines collectives sont basées sur la solidarité. Invitez vos amis avec leur numéro ou partagez le code de votre tontine pour démarrer plus vite."
                        : "Collective tontines are based on solidarity. Invite your friends by phone number or share the code to start your rounds faster."}
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Navigation controls */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 16 }}>
                <TouchableOpacity onPress={handlePrev} style={{ padding: 12, backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(23, 51, 37, 0.06)", borderRadius: 12 }}>
                  <Text style={{ color: THEME.text, fontSize: 14, fontWeight: "bold" }}>←</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  {[0, 1, 2, 3].map((idx) => (
                    <View 
                      key={idx}
                      style={{
                        width: idx === zoomIndex ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: idx === zoomIndex ? COLORS.primary : (isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(23, 51, 37, 0.2)")
                      }}
                    />
                  ))}
                </View>

                <TouchableOpacity onPress={handleNext} style={{ padding: 12, backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(23, 51, 37, 0.06)", borderRadius: 12 }}>
                  <Text style={{ color: THEME.text, fontSize: 14, fontWeight: "bold" }}>→</Text>
                </TouchableOpacity>
              </View>

              {/* Action button */}
              <Button
                title={
                  zoomIndex === 0 ? (language === "fr" ? "Gérer mes cartes" : "Manage Cards") :
                  zoomIndex === 1 ? (language === "fr" ? "Voir mon profil" : "View Profile") :
                  zoomIndex === 2 ? (language === "fr" ? "Aller à mes épargnes" : "Go to Savings") :
                  (language === "fr" ? "Créer une tontine" : "Create Tontine")
                }
                onPress={handleAction}
                style={{ marginTop: 8 }}
              />
            </GlassCard>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  };

  // ─── RENDERS — MAIN APP SCREEN ─────────────────────────────

  const renderMain = () => {
    return (
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: THEME.bg }]}>
        {/* Top Header */}
        <View style={[styles.headerBar, { borderBottomColor: THEME.glassBorder }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Logo size={32} />
            <Text style={[styles.headerBrand, { color: THEME.text }]}>Egoto</Text>
          </View>
          <TouchableOpacity onPress={refreshData} style={{ padding: 6 }}>
            <Text style={{ fontSize: 20 }}>🔄</Text>
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
              <HomeIcon color={activeTab === "home" ? THEME.primary : THEME.textMuted} size={tabIconSize} />
              <Text style={[styles.tabLabelSub, activeTab === "home" && styles.tabLabelSubActive, { color: activeTab === "home" ? THEME.primary : THEME.textMuted }]}>{language === "fr" ? "Accueil" : "Home"}</Text>
            </TouchableOpacity>

            {/* Tab 2 */}
            <TouchableOpacity onPress={() => setActiveTab("circles")} style={styles.tabButton}>
              <CirclesIcon color={activeTab === "circles" ? THEME.primary : THEME.textMuted} size={tabIconSize} />
              <Text style={[styles.tabLabelSub, activeTab === "circles" && styles.tabLabelSubActive, { color: activeTab === "circles" ? THEME.primary : THEME.textMuted }]}>{language === "fr" ? "Tontines" : "Circles"}</Text>
            </TouchableOpacity>

            {/* Tab 3 */}
            <TouchableOpacity onPress={() => setActiveTab("pots")} style={styles.tabButton}>
              <PotsIcon color={activeTab === "pots" ? THEME.primary : THEME.textMuted} size={tabIconSize} />
              <Text style={[styles.tabLabelSub, activeTab === "pots" && styles.tabLabelSubActive, { color: activeTab === "pots" ? THEME.primary : THEME.textMuted }]}>{language === "fr" ? "Bols" : "Pots"}</Text>
            </TouchableOpacity>

            {/* Tab 4 */}
            <TouchableOpacity onPress={() => setActiveTab("cards")} style={styles.tabButton}>
              <CardsIcon color={activeTab === "cards" ? THEME.primary : THEME.textMuted} size={tabIconSize} />
              <Text style={[styles.tabLabelSub, activeTab === "cards" && styles.tabLabelSubActive, { color: activeTab === "cards" ? THEME.primary : THEME.textMuted }]}>{language === "fr" ? "Cartes" : "Cards"}</Text>
            </TouchableOpacity>

            {/* Tab 5 */}
            <TouchableOpacity onPress={() => setActiveTab("profile")} style={styles.tabButton}>
              <ProfileIcon color={activeTab === "profile" ? THEME.primary : THEME.textMuted} size={tabIconSize} />
              <Text style={[styles.tabLabelSub, activeTab === "profile" && styles.tabLabelSubActive, { color: activeTab === "profile" ? THEME.primary : THEME.textMuted }]}>{language === "fr" ? "Profil" : "Profile"}</Text>
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
  // Tab 1: Accueil / Dashboard
  const renderTabHome = () => {
    const totalPotsSaved = pots.reduce((sum, p) => sum + p.currentAmount, 0);
    const scoreVal = scoreInfo?.score ?? 0;
    const maxScore = 1000;
    const percentage = Math.min(100, (scoreVal / maxScore) * 100);

    return (
      <View style={styles.tabContent}>
        {/* LIGNE 1 : Carte VISA Egoto & Score Jauge (FinPoint layout) */}
        <View style={styles.finpointRow}>
          
          {/* Widget 1: Carte VISA Egoto Gold */}
          <TouchableOpacity
            style={{ flex: 1.3 }}
            activeOpacity={0.95}
            onPress={() => { setZoomIndex(0); setShowZoomModal(true); }}
          >
            <GlassCard style={StyleSheet.flatten([styles.visaCard, { flex: 1 }])}>
              <View style={styles.visaHeader}>
                <Text style={styles.visaBrand}>Egoto Gold</Text>
                <View style={styles.visaLogoContainer}>
                  <Text style={styles.visaLogoText}>VISA</Text>
                </View>
              </View>
              
              <View style={styles.visaBody}>
                <Text style={styles.visaBalanceLabel}>{language === "fr" ? "SOLDE GLOBAL" : "TOTAL BALANCE"}</Text>
                <Text style={styles.visaBalanceValue}>{totalPotsSaved.toLocaleString()} FCFA</Text>
              </View>
              
              <View style={styles.visaFooter}>
                <View>
                  <Text style={styles.visaUser}>{profile?.firstName} {profile?.lastName}</Text>
                  <Text style={styles.visaId}>{profile?.egotoId || "EG-00000"}</Text>
                </View>
                <Text style={styles.visaExpiry}>12/29</Text>
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Widget 2: Score Egoto Health (Arc de progression circulaire) */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.95}
            onPress={() => { setZoomIndex(1); setShowZoomModal(true); }}
          >
            <GlassCard style={StyleSheet.flatten([styles.healthScoreWidget, { flex: 1 }])}>
              <Text style={styles.healthLabel}>{language === "fr" ? "Score Egoto" : "Egoto Score"}</Text>
              
              <View style={styles.healthArcContainer}>
                <View style={styles.healthOuterRing} />
                <View style={[styles.healthProgressArc, { transform: [{ rotate: `${(percentage * 1.8) - 90}deg` }], borderColor: THEME.primary }]} />
                <View style={styles.healthCenterCircle}>
                  <Text style={styles.healthScoreNumber}>{scoreVal}</Text>
                  <Text style={styles.healthScoreMax}>/ {maxScore}</Text>
                </View>
              </View>
              
              <Text style={styles.healthTierText}>{scoreInfo ? t(language, `scoreTiers.${scoreInfo.tier}`) : "Débutant"}</Text>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* LIGNE 2 : Performance Histogramme & Tontines Actives */}
        <View style={styles.finpointRow}>
          
          {/* Widget 3: Mini-Graphique (Histogramme néon) */}
          <TouchableOpacity
            style={{ flex: 1.3 }}
            activeOpacity={0.95}
            onPress={() => { setZoomIndex(2); setShowZoomModal(true); }}
          >
            <GlassCard style={StyleSheet.flatten([styles.performanceWidget, { flex: 1 }])}>
              <View style={styles.perfHeader}>
                <Text style={styles.perfLabel}>{language === "fr" ? "Activité Hebdo" : "Weekly Activity"}</Text>
                <Text style={styles.perfValue}>+12.4%</Text>
              </View>
              
              <View style={styles.chartContainer}>
                <View style={[styles.chartBar, { height: "35%", backgroundColor: THEME.primary }]} />
                <View style={[styles.chartBar, { height: "55%", backgroundColor: COLORS.accent }]} />
                <View style={[styles.chartBar, { height: "75%", backgroundColor: "#FF007F" }]} />
                <View style={[styles.chartBar, { height: "45%", backgroundColor: THEME.primary }]} />
                <View style={[styles.chartBar, { height: "90%", backgroundColor: COLORS.success }]} />
                <View style={[styles.chartBar, { height: "60%", backgroundColor: "#8E00FF" }]} />
                <View style={[styles.chartBar, { height: "80%", backgroundColor: THEME.primary }]} />
              </View>
            </GlassCard>
          </TouchableOpacity>

          {/* Widget 4: Tontines Status */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.95}
            onPress={() => { setZoomIndex(3); setShowZoomModal(true); }}
          >
            <GlassCard style={StyleSheet.flatten([styles.tontineStatWidget, { flex: 1 }])}>
              <Text style={styles.statBoxLabel}>{language === "fr" ? "Tontines Actives" : "Active Circles"}</Text>
              <Text style={styles.tontineStatNumber}>{circles.length}</Text>
              <Text style={styles.tontineStatSub}>
                {circles.filter((c: any) => c._count.members === c.maxMembers).length} {language === "fr" ? "en cours" : "running"}
              </Text>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* Call to action onboarding style for empty lists */}
        {circles.length === 0 && pots.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState />
            <Text style={styles.emptyStateText}>{language === "fr" ? "Aucune tontine ni bol d'épargne. C'est le moment de commencer !" : "No tontines or savings pots yet. Time to start!"}</Text>
            <View style={styles.emptyActions}>
              <Button title={language === "fr" ? "Créer un cercle" : "Create circle"} onPress={() => setShowCreateCircle(true)} style={styles.actionBtn} />
              <Button title={language === "fr" ? "Créer un bol" : "Create pot"} onPress={() => setShowCreatePot(true)} variant="secondary" style={styles.actionBtn} />
            </View>
          </View>
        ) : (
          <View style={styles.dashboardQuickActions}>
            <Button title={language === "fr" ? "Nouveau cercle" : "New circle"} onPress={() => setShowCreateCircle(true)} style={styles.quickActionBtn} />
            <Button title={language === "fr" ? "Nouveau bol" : "New pot"} onPress={() => setShowCreatePot(true)} variant="secondary" style={styles.quickActionBtn} />
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
          <Text style={[styles.sectionTitle, { color: THEME.text }]}>{language === "fr" ? "Cercles de tontine" : "Tontine Circles"}</Text>
          <View style={styles.rowActions}>
            <TouchableOpacity 
              onPress={() => setShowJoinCircle(true)} 
              style={[styles.headerIconBtn, headerBtnPadding]}
            >
              <Text style={{ color: THEME.text, fontSize: headerBtnTextSize, fontWeight: "bold" }}>
                {language === "fr" ? "Rejoindre" : "Join"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowCreateCircle(true)} 
              style={[styles.headerIconBtn, headerBtnPadding]}
            >
              <Text style={{ color: THEME.text, fontSize: headerBtnTextSize, fontWeight: "bold" }}>
                {language === "fr" ? "Créer" : "Create"}
              </Text>
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
          <Text style={[styles.sectionTitle, { color: THEME.text }]}>{language === "fr" ? "Bols d'Épargne" : "Savings Pots"}</Text>
          <TouchableOpacity 
            onPress={() => setShowCreatePot(true)} 
            style={[styles.headerIconBtn, headerBtnPadding]}
          >
            <Text style={{ color: THEME.text, fontSize: headerBtnTextSize, fontWeight: "bold" }}>
              {language === "fr" ? "Créer un bol" : "Create pot"}
            </Text>
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
          <Text style={[styles.sectionTitle, { color: THEME.text }]}>{language === "fr" ? "Score Egoto" : "Egoto Score"}</Text>
          <Text style={styles.scoreNumber}>{scoreInfo?.score ?? 0} <Text style={styles.scoreMax}>/ 1000</Text></Text>
          <Text style={styles.scoreProgressText}>
            {scoreInfo?.nextTier
              ? (language === "fr" ? `Plus que ${scoreInfo.pointsToNext} points pour débloquer : ${t(language, `scoreTiers.${scoreInfo.nextTier}`)}` : `Only ${scoreInfo.pointsToNext} points left to unlock: ${t(language, `scoreTiers.${scoreInfo.nextTier}`)}`)
              : (language === "fr" ? "Tous les paliers débloqués !" : "All tiers unlocked!")}
          </Text>
        </GlassCard>

        {/* Active Visa Cards */}
        <View style={styles.tabHeaderRow}>
          <Text style={[styles.sectionTitle, { color: THEME.text }]}>{language === "fr" ? "Mes cartes Visa Egoto" : "My Egoto Visa Cards"}</Text>
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
    const handleVerifyIdentity = async () => {
      if (!docNumber) {
        Alert.alert(
          language === "fr" ? "Numéro requis" : "Number required",
          language === "fr"
            ? `Veuillez renseigner votre numéro de ${docType === "cni" ? "CNI" : "Passeport"}.`
            : `Please enter your ${docType === "cni" ? "CNI" : "Passport"} number.`
        );
        return;
      }

      if (!docImage) {
        Alert.alert(
          language === "fr" ? "Photo requise" : "Photo required",
          language === "fr"
            ? "Veuillez prendre en photo votre document d'identité pour finaliser la vérification."
            : "Please take a photo of your identity document to finalize the verification."
        );
        return;
      }
      
      setLoading(true);
      try {
        const res = await api.verifyIdentity({
          email: securityEmail || undefined,
          cniNumber: docType === "cni" ? docNumber : undefined,
          passportNumber: docType === "passport" ? docNumber : undefined,
        });
        setLoading(false);
        if (res.success) {
          setProfile(res.data);
          Alert.alert(
            language === "fr" ? "Sécurité renforcée !" : "Enhanced security!",
            language === "fr" 
              ? "Vos informations d'identité et la photo de votre document ont été enregistrées avec succès." 
              : "Your identity credentials and document photo have been successfully verified."
          );
        } else {
          Alert.alert(errorMessage(language, res.error?.code || "GENERIC"));
        }
      } catch (e) {
        setLoading(false);
        Alert.alert(language === "fr" ? "Erreur de connexion" : "Connection Error");
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.tabContent}>
          <GlassCard style={styles.profileCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Text style={[styles.profileName, { color: THEME.textLight }]}>{profile?.firstName} {profile?.lastName}</Text>
              {profile?.isVerified ? (
                <View style={[styles.securityBadge, { backgroundColor: "rgba(0, 230, 86, 0.15)", borderColor: COLORS.success, flexDirection: "row", alignItems: "center", gap: 4 }]}>
                  <ShieldIcon color={COLORS.success} size={12} />
                  <Text style={[styles.securityBadgeText, { color: COLORS.success }]}>{language === "fr" ? "Renforcé" : "Reinforced"}</Text>
                </View>
              ) : (
                <View style={[styles.securityBadge, { backgroundColor: "rgba(255, 145, 0, 0.15)", borderColor: COLORS.warning, flexDirection: "row", alignItems: "center", gap: 4 }]}>
                  <ShieldIcon color={COLORS.warning} size={12} />
                  <Text style={[styles.securityBadgeText, { color: COLORS.warning }]}>{language === "fr" ? "Standard" : "Standard"}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.profilePhone, { color: THEME.textMuted }]}>{profile?.phone}</Text>
            <Text style={[styles.profileId, { color: THEME.textLight }]}>Egoto ID : {profile?.egotoId || "N/A"}</Text>
            
            <View style={styles.divider} />
            
            {/* Formulaire de sécurité renforcée */}
            <Text style={[styles.settingsHeader, { color: THEME.textLight }]}>{language === "fr" ? "Renforcement de la sécurité (KYC)" : "Identity Verification & Security"}</Text>
            <Text style={[styles.settingsSub, { color: THEME.textMuted }]}>{language === "fr" ? "Ajoutez vos pièces officielles pour déverrouiller toutes les limites." : "Verify your official identity cards to unlock higher tiers."}</Text>
            
            <Input
              label={language === "fr" ? "Adresse E-mail" : "Email Address"}
              placeholder="kofi.mensah@gmail.com"
              value={securityEmail || profile?.email || ""}
              onChangeText={setSecurityEmail}
              keyboardType="email-address"
            />

            {/* Sélecteur de type de document */}
            <Text style={{ color: THEME.textLight, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
              {language === "fr" ? "Type de Document" : "Document Type"}
            </Text>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
              <TouchableOpacity 
                onPress={() => setDocType("cni")}
                style={[
                  { borderColor: THEME.inputBorder, backgroundColor: "rgba(255,255,255,0.03)", flex: 1, height: 48, borderRadius: 12, borderWidth: 1, justifyContent: "center", alignItems: "center" },
                  docType === "cni" ? { backgroundColor: THEME.primary, borderColor: THEME.primary } : {}
                ]}
              >
                <Text style={[{ color: THEME.textLight, fontSize: 13 }, docType === "cni" ? { color: THEME.primaryForeground, fontWeight: "bold" } : {}]}>
                  {language === "fr" ? "Carte d'Identité (CNI)" : "National ID (CNI)"}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setDocType("passport")}
                style={[
                  { borderColor: THEME.inputBorder, backgroundColor: "rgba(255,255,255,0.03)", flex: 1, height: 48, borderRadius: 12, borderWidth: 1, justifyContent: "center", alignItems: "center" },
                  docType === "passport" ? { backgroundColor: THEME.primary, borderColor: THEME.primary } : {}
                ]}
              >
                <Text style={[{ color: THEME.textLight, fontSize: 13 }, docType === "passport" ? { color: THEME.primaryForeground, fontWeight: "bold" } : {}]}>
                  {language === "fr" ? "Passeport" : "Passport"}
                </Text>
              </TouchableOpacity>
            </View>

            <Input
              label={docType === "cni" ? (language === "fr" ? "Numéro CNI (Carte d'Identité)" : "National ID Card Number (CNI)") : (language === "fr" ? "Numéro de Passeport" : "Passport Number")}
              placeholder={docType === "cni" ? "CNI-TG-XXXXXX" : "N-TG-XXXXXX"}
              value={docNumber || (docType === "cni" ? profile?.cniNumber : profile?.passportNumber) || ""}
              onChangeText={setDocNumber}
            />

            {/* Bouton Photo */}
            <Text style={{ color: THEME.textLight, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
              {language === "fr" ? "Photo du Document" : "Document Photo"}
            </Text>
            
            <TouchableOpacity 
              onPress={() => setDocImage("https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&q=80")}
              style={[
                { height: 50, borderRadius: 12, borderWidth: 1, borderStyle: "dashed", justifyContent: "center", alignItems: "center", marginBottom: 12, borderColor: THEME.inputBorder, flexDirection: "row", gap: 8 },
                docImage ? { borderColor: COLORS.success, borderStyle: "solid" } : {}
              ]}
            >
              {docImage ? (
                <>
                  <ShieldIcon color={COLORS.success} size={18} />
                  <Text style={{ color: COLORS.success, fontSize: 14, fontWeight: "600" }}>
                    {language === "fr" ? "Photo capturée avec succès" : "Photo captured successfully"}
                  </Text>
                </>
              ) : (
                <>
                  <CameraIcon color={THEME.primary} size={18} />
                  <Text style={{ color: THEME.textLight, fontSize: 14 }}>
                    {language === "fr" ? "Photographier le document" : "Take document photo"}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {docImage && (
              <View style={{ alignItems: "center", marginVertical: 14 }}>
                <Image 
                  source={{ uri: docImage }} 
                  style={{ width: "100%", height: 160, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" }} 
                />
              </View>
            )}
            
            <Button
              title={language === "fr" ? "Activer la Sécurité Renforcée" : "Enable Enhanced Security"}
              onPress={handleVerifyIdentity}
              loading={loading}
              style={{ marginTop: 12 }}
            />

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

            {/* Thème toggle */}
            <View style={styles.settingsRow}>
              <Text style={[styles.settingLabel, { color: THEME.textLight }]}>{language === "fr" ? "Mode Visuel" : "Visual Theme"}</Text>
              <View style={styles.langToggleGroup}>
                <TouchableOpacity 
                  onPress={() => {
                    setIsDarkMode(true);
                    COLORS.isDark = true;
                  }} 
                  style={[styles.langBtn, isDarkMode && styles.langBtnActive]}
                >
                  <Text style={[styles.langBtnText, isDarkMode && styles.langBtnTextActive]}>
                    {language === "fr" ? "Sombre" : "Dark"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {
                    setIsDarkMode(false);
                    COLORS.isDark = false;
                  }} 
                  style={[styles.langBtn, !isDarkMode && styles.langBtnActive]}
                >
                  <Text style={[styles.langBtnText, !isDarkMode && styles.langBtnTextActive]}>
                    {language === "fr" ? "Clair" : "Light"}
                  </Text>
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
                    {["weekly", "biweekly", "monthly", "custom"].map((f) => (
                      <TouchableOpacity
                        key={f}
                        onPress={() => setPotForm({ ...potForm, frequency: f })}
                        style={[styles.freqBtn, potForm.frequency === f && styles.freqBtnActive]}
                      >
                        <Text style={[styles.freqBtnText, potForm.frequency === f && styles.freqBtnTextActive]}>
                          {f === "custom" ? (language === "fr" ? "Perso" : "Custom") : t(language, `labels.${f}`)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {potForm.frequency === "custom" && (
                    <Input
                      label={language === "fr" ? "Tous les combien de jours ?" : "Every how many days?"}
                      placeholder="ex: 5"
                      value={potForm.customDays}
                      onChangeText={(text) => setPotForm({ ...potForm, customDays: text })}
                      keyboardType="numeric"
                    />
                  )}
                </>
              )}

              {/* Lock account toggle */}
              <TouchableOpacity
                onPress={() => setPotForm({ ...potForm, isLocked: !potForm.isLocked })}
                style={[styles.lockToggleRow, { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }]}
              >
                {potForm.isLocked ? <LockIcon size={18} color={THEME.accent} /> : <UnlockIcon size={18} color={THEME.primary} />}
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
                  <View style={{ marginBottom: 20, padding: 16, borderRadius: 16, backgroundColor: "rgba(255, 255, 255, 0.08)", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.6)", marginBottom: 4 }}>
                      {language === "fr" ? "CODE D'INVITATION (5 CARACTÈRES)" : "INVITATION CODE (5 CHARACTERS)"}
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: "bold", letterSpacing: 3, color: COLORS.accent }}>
                      {adminCircleTarget.inviteCode || "—"}
                    </Text>
                    <Text style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.4)", marginTop: 4, marginBottom: 12, textAlign: "center" }}>
                      {language === "fr" 
                        ? "Partagez ce code avec les participants pour qu'ils rejoignent directement sur l'application ou sur WhatsApp."
                        : "Share this code with participants to let them join directly via the App or WhatsApp."}
                    </Text>
                    <Button
                      title={language === "fr" ? "Copier & Partager le lien" : "Copy & Share Link"}
                      onPress={() => handleShareCircle(adminCircleTarget.inviteCode)}
                      style={{ width: "90%", height: 38, borderRadius: 19 }}
                    />
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
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
                                {m.position}. {m.user.firstName} {m.user.lastName}
                              </Text>
                              {m.role === "admin" && <CrownIcon size={12} color={COLORS.accent} />}
                            </View>
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
        {renderZoomModal()}
      </>
    );
  };

  // ─── CYCLE DE VIE GENERAL ──────────────────────────────────

  const bubbleOpacity = isDarkMode ? 0.08 : 0.02;

  return (
    <View style={styles.root}>
      {/* Liquid background shapes - Prestigious Forest & Gold lueurs */}
      <View style={[styles.glowBubble, styles.glowTeal, { backgroundColor: THEME.primary, opacity: bubbleOpacity }]} />
      <View style={[styles.glowBubble, styles.glowGold, { backgroundColor: THEME.accent, opacity: bubbleOpacity }]} />
      <View style={[styles.glowBubble, styles.glowPurple, { backgroundColor: THEME.primary, opacity: bubbleOpacity }]} />
      
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
    backgroundColor: COLORS.primaryDark,
    minHeight: WINDOW_HEIGHT,
    width: "100%",
    overflow: "hidden",
  },
  fullscreen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  
  // Liquid background shapes
  glowBubble: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    opacity: 0.12,
  },
  glowTeal: {
    top: -60,
    left: -60,
    backgroundColor: COLORS.primary,
  },
  glowGold: {
    bottom: "35%",
    right: -80,
    backgroundColor: COLORS.accent,
  },
  glowPurple: {
    bottom: -60,
    left: -40,
    backgroundColor: "#8E00FF",
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    color: "#FFFFFF",
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
    color: "#FFFFFF",
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
    backgroundColor: COLORS.primaryDark,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  headerBrand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  refreshText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  mainScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 180, // space for tab bar to avoid overflow cover
  },
  tabBar: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    borderRadius: 30,
    padding: 0,
    backgroundColor: "rgba(11, 14, 20, 0.85)",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
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

  // Tab - Home (FinPoint Premium Layout)
  tabContent: {
    gap: 16,
  },
  finpointRow: {
    flexDirection: "row",
    gap: 12,
  },
  
  // VISA Card Widget
  visaCard: {
    flex: 1.3,
    height: 180,
    backgroundColor: "rgba(186, 117, 23, 0.08)",
    borderColor: "rgba(255, 184, 0, 0.2)",
    padding: 16,
    justifyContent: "space-between",
    position: "relative",
  },
  visaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  visaBrand: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.accent,
    letterSpacing: 1.5,
  },
  visaLogoContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  visaLogoText: {
    fontSize: 11,
    fontWeight: "900",
    color: COLORS.accent,
    fontStyle: "italic",
  },
  visaBody: {
    marginVertical: 12,
  },
  visaBalanceLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 1,
    fontWeight: "600",
  },
  visaBalanceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  visaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  visaUser: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  visaId: {
    fontSize: 9,
    color: COLORS.textGray,
    marginTop: 1,
  },
  visaExpiry: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },

  // Health Circular Score Widget
  healthScoreWidget: {
    flex: 1,
    height: 180,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.textGray,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  healthArcContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  healthOuterRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  healthProgressArc: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "transparent",
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
  },
  healthCenterCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  healthScoreNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  healthScoreMax: {
    fontSize: 10,
    color: COLORS.textGray,
  },
  healthTierText: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: "bold",
  },

  // Performance (Chart) Widget
  performanceWidget: {
    flex: 1.3,
    height: 140,
    padding: 12,
    justifyContent: "space-between",
  },
  perfHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  perfLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  perfValue: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: "bold",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 80,
    paddingTop: 10,
    gap: 4,
  },
  chartBar: {
    flex: 1,
    borderRadius: 3,
    opacity: 0.85,
  },

  // Tontine Stats Widget
  tontineStatWidget: {
    flex: 1,
    height: 140,
    padding: 12,
    justifyContent: "center",
  },
  statBoxLabel: {
    fontSize: 11,
    color: COLORS.textGray,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  tontineStatNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 4,
  },
  tontineStatSub: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: "500",
  },

  dashboardQuickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  quickActionBtn: {
    flex: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: COLORS.glassBg,
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
    width: "100%",
  },
  actionBtn: {
    flex: 1,
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
    gap: 8,
  },
  headerIconBtn: {
    backgroundColor: COLORS.glassBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  listItemCard: {
    backgroundColor: COLORS.glassBg,
    borderColor: COLORS.glassBorder,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    backgroundColor: COLORS.glassBg,
    borderColor: COLORS.glassBorder,
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
    backgroundColor: "rgba(0, 240, 255, 0.1)",
    borderColor: "rgba(0, 240, 255, 0.2)",
    borderWidth: 1,
    height: 160,
    padding: 20,
    justifyContent: "space-between",
    borderRadius: 20,
  },
  cardGold: {
    backgroundColor: "rgba(255, 184, 0, 0.08)",
    borderColor: COLORS.accent,
    borderWidth: 1.5,
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
    backgroundColor: COLORS.glassBg,
    borderColor: COLORS.glassBorder,
    alignItems: "stretch",
    padding: 24,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profilePhone: {
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 4,
  },
  profileId: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
    marginTop: 4,
  },
  securityBadge: {
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  securityBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.glassBorder,
    width: "100%",
    marginVertical: 20,
  },
  settingsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  settingsSub: {
    fontSize: 12,
    color: COLORS.textGray,
    marginBottom: 16,
    lineHeight: 18,
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
    color: "#FFFFFF",
  },
  langToggleGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 8,
    overflow: "hidden",
  },
  langBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
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
    color: "#000000",
  },
  logoutBtn: {
    width: "100%",
    marginTop: 20,
  },

  // Modal Views
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalCenterBg: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderRadius: 0,
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.glassBorder,
    borderWidth: 1,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    color: "#FFFFFF",
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: COLORS.glassBorder,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  freqBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  freqBtnText: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  freqBtnTextActive: {
    color: "#000000",
  },
  lockToggleRow: {
    backgroundColor: "rgba(255, 184, 0, 0.05)",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 184, 0, 0.2)",
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
    borderColor: COLORS.glassBorder,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  paymentMethodCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(0, 240, 255, 0.08)",
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
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

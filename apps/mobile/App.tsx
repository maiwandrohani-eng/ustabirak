import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { io } from "socket.io-client";

const API = "http://localhost:4000";
const socket = io(API);

type Role = "customer" | "worker";
type Lang = "en" | "tr";

const copy = {
  en: {
    subtitle: "Mobile command center for customers and workers",
    customer: "Customer",
    worker: "Worker",
    workerActions: "Worker Quick Actions",
    customerActions: "Customer Quick Actions",
    workerBody: "Set availability, receive requests, accept jobs, and track payouts to your IBAN.",
    customerBody: "Search categories, request instant jobs, schedule services, and track confirmations.",
    realtime: "Realtime Activity",
    noEvents: "No live events yet.",
    newJob: "New job request",
    acceptedJob: "Accepted job",
    payoutReleased: "Payout released",
    language: "TR",
  },
  tr: {
    subtitle: "Müşteriler ve ustalar için mobil komuta merkezi",
    customer: "Müşteri",
    worker: "Usta",
    workerActions: "Usta hızlı işlemler",
    customerActions: "Müşteri hızlı işlemler",
    workerBody: "Müsaitliğinizi ayarlayın, talepleri alın, işleri kabul edin ve IBAN ödemelerinizi takip edin.",
    customerBody: "Kategorilere göz atın, iş talebi oluşturun, hizmet planlayın ve onayları takip edin.",
    realtime: "Canlı etkinlik",
    noEvents: "Henüz canlı etkinlik yok.",
    newJob: "Yeni iş talebi",
    acceptedJob: "Kabul edilen iş",
    payoutReleased: "Ödeme serbest bırakıldı",
    language: "EN",
  },
} as const;

export default function App() {
  const [role, setRole] = useState<Role>("customer");
  const [lang, setLang] = useState<Lang>("en");
  const [events, setEvents] = useState<string[]>([]);
  const text = copy[lang];

  useEffect(() => {
    if (role === "customer") {
      socket.emit("join:customer", "c1");
    } else {
      socket.emit("join:worker", "w1");
    }

    socket.on("job:new", (payload) => {
      setEvents((prev) => [`${text.newJob}: ${payload.job.title}`, ...prev].slice(0, 8));
    });
    socket.on("job:accepted", (payload) => {
      setEvents((prev) => [`${text.acceptedJob}: ${payload.job.id}`, ...prev].slice(0, 8));
    });
    socket.on("payment:released", (payload) => {
      setEvents((prev) => [`${text.payoutReleased}: ${payload.payoutAmount} EUR`, ...prev].slice(0, 8));
    });

    return () => {
      socket.off("job:new");
      socket.off("job:accepted");
      socket.off("payment:released");
    };
  }, [role, text.acceptedJob, text.newJob, text.payoutReleased]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>
          UstaYolda
        </Text>
        <View style={styles.topRow}>
          <Text style={styles.subtitle}>{text.subtitle}</Text>
          <TouchableOpacity style={styles.langButton} onPress={() => setLang((value) => (value === "en" ? "tr" : "en"))}>
            <Text style={styles.langButtonText}>{text.language}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleButton, role === "customer" && styles.roleSelected]}
            onPress={() => setRole("customer")}
          >
            <Text style={styles.roleText}>{text.customer}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === "worker" && styles.roleSelected]}
            onPress={() => setRole("worker")}
          >
            <Text style={styles.roleText}>{text.worker}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{role === "worker" ? text.workerActions : text.customerActions}</Text>
          <Text style={styles.cardBody}>
            {role === "worker"
              ? text.workerBody
              : text.customerBody}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{text.realtime}</Text>
          {events.map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.event}>
              {item}
            </Text>
          ))}
          {!events.length ? <Text style={styles.event}>{text.noEvents}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#050505"
  },
  container: {
    padding: 20,
    gap: 14
  },
  brand: {
    color: "#f5f5f5",
    fontSize: 38,
    fontWeight: "800"
  },
  brandAccent: {
    color: "#ff533f"
  },
  subtitle: {
    color: "#bdbdbd"
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  langButton: {
    borderWidth: 1,
    borderColor: "#ffffff26",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#151515"
  },
  langButtonText: {
    color: "#f5f5f5",
    fontWeight: "600"
  },
  roleRow: {
    flexDirection: "row",
    gap: 10
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff26",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#151515"
  },
  roleSelected: {
    borderColor: "#ff533f",
    backgroundColor: "#2b140f"
  },
  roleText: {
    color: "#f5f5f5",
    textAlign: "center"
  },
  card: {
    backgroundColor: "#121212",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ffffff1f",
    padding: 14,
    gap: 8
  },
  cardTitle: {
    color: "#ff533f",
    fontWeight: "700",
    fontSize: 16
  },
  cardBody: {
    color: "#d8d8d8"
  },
  event: {
    color: "#f5f5f5",
    backgroundColor: "#ffffff0a",
    borderRadius: 8,
    padding: 10
  }
});
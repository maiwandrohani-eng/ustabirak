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

export default function App() {
  const [role, setRole] = useState<Role>("customer");
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (role === "customer") {
      socket.emit("join:customer", "c1");
    } else {
      socket.emit("join:worker", "w1");
    }

    socket.on("job:new", (payload) => {
      setEvents((prev) => [`New job request: ${payload.job.title}`, ...prev].slice(0, 8));
    });
    socket.on("job:accepted", (payload) => {
      setEvents((prev) => [`Accepted job: ${payload.job.id}`, ...prev].slice(0, 8));
    });
    socket.on("payment:released", (payload) => {
      setEvents((prev) => [`Payout released: ${payload.payoutAmount} EUR`, ...prev].slice(0, 8));
    });

    return () => {
      socket.off("job:new");
      socket.off("job:accepted");
      socket.off("payment:released");
    };
  }, [role]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>
          Ustaya<Text style={styles.brandAccent}>Birak</Text>
        </Text>
        <Text style={styles.subtitle}>Mobile command center for customers and workers</Text>

        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleButton, role === "customer" && styles.roleSelected]}
            onPress={() => setRole("customer")}
          >
            <Text style={styles.roleText}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === "worker" && styles.roleSelected]}
            onPress={() => setRole("worker")}
          >
            <Text style={styles.roleText}>Worker</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{role === "worker" ? "Worker Quick Actions" : "Customer Quick Actions"}</Text>
          <Text style={styles.cardBody}>
            {role === "worker"
              ? "Set availability, receive requests, accept jobs, and track payouts to your IBAN."
              : "Search categories, request instant jobs, schedule services, and track confirmations."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Realtime Activity</Text>
          {events.map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.event}>
              {item}
            </Text>
          ))}
          {!events.length ? <Text style={styles.event}>No live events yet.</Text> : null}
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
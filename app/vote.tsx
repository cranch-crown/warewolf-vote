import { View, Text, Button, Pressable, Modal, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

type Vote = {
    voter?: string;
    destination?: string;
};

export default function VoteScreen() {
    const { players } = useLocalSearchParams<{ players?: string }>();

    const playerList =
        players?.split("\n").filter(p => p.trim() !== "") ?? [];

    const [votes, setVotes] = useState<Vote[]>([]);

    const addVoteRow = () => {
        setVotes(prev => [...prev, {}]);
    };

    const updateVote = (index: number, patch: Partial<Vote>) => {
        setVotes(prev =>
            prev.map((v, i) => (i === index ? { ...v, ...patch } : v))
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.utility}>
                <Button title="前の日" onPress={() => {}} />
                <Button title="次の日" onPress={() => {}} />
            </View>

            {votes.map((vote, index) => (
                <View key={index} style={styles.row}>
                    <SelectModal
                        label={vote.voter || "投票者を選択"}
                        options={playerList}
                        onSelect={(voter) =>
                            updateVote(index, { voter, destination: undefined })
                        }
                    />

                    <Text style={styles.arrow}>→</Text>

                    <SelectModal
                        label={vote.destination || "投票先を選択"}
                        options={playerList.filter(p => p !== vote.voter)}
                        onSelect={(destination) =>
                            updateVote(index, { destination })
                        }
                        disabled={!vote.voter}
                    />
                </View>
            ))}

            <View style={{ marginTop: 20 }}>
                <Button title="＋ 投票行を追加" onPress={addVoteRow} />
            </View>
        </ScrollView>
    );
}

/* =========================
   モーダル選択コンポーネント
========================= */

function SelectModal({
                         label,
                         options,
                         onSelect,
                         disabled = false,
                     }: {
    label: string;
    options: string[];
    onSelect: (v: string) => void;
    disabled?: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Pressable
                disabled={disabled}
                onPress={() => setOpen(true)}
                style={[
                    styles.select,
                    disabled && { backgroundColor: "#ddd" },
                ]}
            >
                <Text>{label}</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
                    <View style={styles.modal}>
                        {options.map(o => (
                            <Pressable
                                key={o}
                                onPress={() => {
                                    onSelect(o);
                                    setOpen(false);
                                }}
                                style={styles.option}
                            >
                                <Text>{o}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

/* =========================
   styles
========================= */

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    utility: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    arrow: {
        marginHorizontal: 8,
        fontSize: 18,
    },
    select: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 6,
        minWidth: 120,
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
    },
    modal: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 8,
        paddingVertical: 10,
    },
    option: {
        padding: 14,
    },
});

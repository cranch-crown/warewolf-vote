import { useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router'

export default function Index() {
    const [players, setPlayers] = useState('');

    const handleStart = () => {
        router.push({
            pathname: '/vote',
            params: {players},
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>参加者一覧</Text>

            <TextInput
                value={players}
                onChangeText={setPlayers}
                multiline
                style={styles.textarea}
                textAlignVertical="top"
            />

            <Button title="始める" onPress={handleStart} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 15,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#333',   // ★超重要
        height: 300,
        margin: 10,
        padding: 8,
        textAlignVertical: 'top', // ★Android必須
    },
});

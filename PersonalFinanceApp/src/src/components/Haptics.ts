import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export async function hapticLight() {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    try {
        await Haptics.selectionAsync();
    } catch { }
}

export async function hapticSuccess() {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch { }
}

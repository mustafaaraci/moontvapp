import { useCallback } from "react";
import * as Haptics from "expo-haptics";
//kullanabiliriz hazırda  bulunan haptic feedbackleri
const useHaptic = () => {
  const triggerHaptic = useCallback((type = "selection") => {
    switch (type) {
      case "selection":
        Haptics.selectionAsync();
        break;
      case "impactLight":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "impactMedium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "impactHeavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "notificationSuccess":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "notificationWarning":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "notificationError":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        Haptics.selectionAsync();
        break;
    }
  }, []);

  return triggerHaptic;
};

export default useHaptic;

import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = (isComplete: boolean) => {
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: isComplete ? 150 : 50,
    };

    confetti({
      ...defaults,
      origin: { y: 0.7 },
    });

    if (isComplete) {
      setTimeout(() => {
        confetti({
          ...defaults,
          origin: { y: 0.7 },
        });
      }, 250);
    }
  };

  return { triggerConfetti };
};
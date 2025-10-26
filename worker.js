self.onmessage = (e) => {
  if (e.data.action === 'calculate-big') {
    let sum = 0;
    for (let i = 0; i < 500000000; i++) {
      sum += Math.sqrt(i);
    }
    self.postMessage(sum);
  }
} 
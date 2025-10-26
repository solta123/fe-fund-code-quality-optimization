if (window.Worker) {
  const worker = new Worker('./worker.js');
  worker.postMessage({ action: 'calculate-big' });
  worker.onmessage = (result) => {
    document.getElementById('calculated-data').innerText = result.data;
  }
}

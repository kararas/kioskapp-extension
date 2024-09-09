chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'print') {
    // 特定のプリンターIDを直接指定
    const printerId = 'YOUR_PRINTER_ID'; // ここでプリンターIDを指定

    chrome.printing.createJob({
      printerId: printerId,
      title: '印刷ジョブ',
      contentType: 'pdf', 
      document: message.content
    }, (jobId) => {
      if (chrome.runtime.lastError) {
        console.error('Error creating print job:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('Print job created:', jobId);
        sendResponse({ success: true });
      }
    });
  }
  return true; 
});
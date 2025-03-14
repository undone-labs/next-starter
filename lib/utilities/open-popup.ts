type PopupOptions = {
  id: string;
  url: string;
  title: string;
  w: number;
  h: number;
}

export default function openPopup({ id, url, title, w, h }: PopupOptions): void {
  const zoomLevel: number = window.devicePixelRatio || 1;

  const top: number = (window.screen.availHeight - h * zoomLevel) / 2;
  const left: number = (window.screen.availWidth - w * zoomLevel) / 2;

  const newWindow: Window | null = window.open(url, title, `
    scrollbars=yes,
    width=${w * zoomLevel},
    height=${h * zoomLevel},
    top=${top},
    left=${left}
  `);

  if (!newWindow) {
    return;
  }

  const interval = setInterval(() => {
    if (newWindow.closed) {
      window.postMessage({
        id,
        action: 'close-popup'
      }, window.location.origin);
      clearInterval(interval);
    }
  }, 100);

  newWindow.focus();
} 

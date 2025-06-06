export const generateID = (length: number) => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('').substring(0, length);
}

export const delay = (func: () => void, delay: number = 200) => setTimeout(() => func(), delay)

export const faviconURL = (u: string) => {
    const destUrl = new URL(u.startsWith("http") ? u : `https://${u}/`)
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", destUrl.origin);
    url.searchParams.set("size", "32");
    return url.toString();
}

export const newTab = () => {
    const url = chrome.runtime.getURL('index.html')
    chrome.tabs.create({ url })
}

/**
 * Desktop Notify
 */
export const sendNotify = (title: string, message: string) => {
    chrome.notifications.create(
        Date.now().toString(),
        {
            title,
            message,
            type: "basic",
            iconUrl: chrome.runtime.getURL(`assets/logo.png`)
        }
    );
}
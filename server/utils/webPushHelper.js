const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "BOIWMrqo_ksLzCwtJJ7J0MN12jiNQrWgXzlY2Xqm6CYq-nE44fOENcY5GNpWOSZVLncQ1XHBgh6oWtwTP5VoCDQ";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "CnEd3UqfAN3KSImShT8DpxeEqf5TjD7tTCiSHLtK0pg";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:dhavalbhusara0123@gmail.com";

try {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  console.log("✅ [WebPush] VAPID details configured successfully.");
} catch (err) {
  console.error("❌ [WebPush] Config error:", err.message);
}

/**
 * Send Web Push Notification to all subscribed devices (Mobile phones & Desktops)
 * Delivers via Google FCM / Mozilla Push servers even when the website is closed!
 */
async function sendWebPushToAll({ title, body, icon, url, data = {} }) {
  try {
    const subscriptions = await PushSubscription.find().lean();
    if (!subscriptions || subscriptions.length === 0) {
      console.log("[WebPush] No active push subscriptions found in database yet.");
      return { success: true, count: 0 };
    }

    const payload = JSON.stringify({
      title: title || "🇮🇳 Jobopedia: New Job Alert",
      body: body || "A new job matching your qualification has just been posted!",
      icon: icon || "/images/jobopedia-icon.png",
      badge: "/images/jobopedia-icon.png",
      url: url || "https://jobopedia.in",
      timestamp: Date.now(),
      ...data
    });

    console.log(`[WebPush] Broadcasting official Web Push to ${subscriptions.length} registered devices...`);

    let delivered = 0;
    const staleSubscriptions = [];

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          const pushConfig = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.keys.p256dh,
              auth: sub.keys.auth
            }
          };
          await webpush.sendNotification(pushConfig, payload);
          delivered++;
        } catch (err) {
          // If subscription has expired or unsubscribed on phone, remove from DB
          if (err.statusCode === 410 || err.statusCode === 404) {
            staleSubscriptions.push(sub.endpoint);
          } else {
            console.warn(`[WebPush] Push failed for endpoint:`, err.message);
          }
        }
      })
    );

    if (staleSubscriptions.length > 0) {
      await PushSubscription.deleteMany({ endpoint: { $in: staleSubscriptions } });
      console.log(`[WebPush] Removed ${staleSubscriptions.length} expired device subscriptions.`);
    }

    console.log(`✅ [WebPush] Successfully delivered to ${delivered}/${subscriptions.length} devices!`);
    return { success: true, delivered, total: subscriptions.length };
  } catch (err) {
    console.error("❌ [WebPush] Broadcast Error:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = {
  VAPID_PUBLIC_KEY,
  sendWebPushToAll
};

<?php
/**
 * NEXA TECH IT SOLUTIONS - Contact Form Handler
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://nexatechitsolutions.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ─── CONFIGURATION ───────────────────────────────────────────────────────────

$email_to   = 'info.nexatechitsolutions@gmail.com';
$email_from = 'noreply@nexatechitsolutions.com';

// ─────────────────────────────────────────────────────────────────────────────

function sendResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

function sanitize($value) {
    return htmlspecialchars(stripslashes(trim($value)));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method.');
}

$input = file_get_contents('php://input');
$data  = json_decode($input, true) ?? $_POST;

// Validate & sanitize
$name    = sanitize($data['name']    ?? '');
$email   = sanitize($data['email']   ?? '');
$phone   = sanitize($data['phone']   ?? '');
$service = sanitize($data['service'] ?? '');
$message = sanitize($data['message'] ?? '');

if (strlen($name) < 2) {
    sendResponse(false, 'Please enter your full name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address.');
}
if (strlen($message) < 10) {
    sendResponse(false, 'Message must be at least 10 characters.');
}

$phone_display   = $phone   ?: 'Not provided';
$service_display = $service ?: 'Not specified';

// ─── SEND EMAIL ───────────────────────────────────────────────────────────────

$subject = '[Contact Form] New enquiry from ' . $name;

$email_body = "
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .wrap { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #0392FC, #10DCDF); padding: 30px 20px; text-align: center; color: #fff; }
  .header h2 { margin: 0; font-size: 22px; }
  .body { padding: 30px; }
  .row { margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px; }
  .label { font-size: 12px; color: #0392FC; font-weight: bold; text-transform: uppercase; margin-bottom: 4px; }
  .value { font-size: 15px; color: #333; }
  .msg-box { background: #f7fbff; border-left: 4px solid #0392FC; padding: 14px; border-radius: 4px; color: #333; font-size: 15px; line-height: 1.6; }
  .footer { background: #f9f9f9; text-align: center; padding: 16px; font-size: 12px; color: #999; }
</style>
</head>
<body>
  <div class='wrap'>
    <div class='header'>
      <h2>📬 New Contact Form Submission</h2>
      <p style='margin:6px 0 0;opacity:.9;font-size:14px;'>NEXA TECH IT SOLUTIONS Website</p>
    </div>
    <div class='body'>
      <div class='row'><div class='label'>Full Name</div><div class='value'>{$name}</div></div>
      <div class='row'><div class='label'>Email Address</div><div class='value'>{$email}</div></div>
      <div class='row'><div class='label'>Phone Number</div><div class='value'>{$phone_display}</div></div>
      <div class='row'><div class='label'>Service Interested In</div><div class='value'>{$service_display}</div></div>
      <div class='row' style='border:none;padding:0;'>
        <div class='label'>Message</div>
        <div class='msg-box'>" . nl2br($message) . "</div>
      </div>
    </div>
    <div class='footer'>Received on " . date('F j, Y \a\t g:i a') . " &nbsp;|&nbsp; nexatechitsolutions.com</div>
  </div>
</body>
</html>
";

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: NEXA TECH Contact Form <' . $email_from . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
]);

$sent = mail($email_to, $subject, $email_body, $headers);

// ─── LOG & RESPOND ────────────────────────────────────────────────────────────

$log = date('Y-m-d H:i:s') . " | {$name} | {$email} | {$phone_display}\n";
@file_put_contents(__DIR__ . '/contact-log.txt', $log, FILE_APPEND);

if ($sent) {
    sendResponse(true, 'Message Sent! We will contact you soon.');
} else {
    sendResponse(false, 'Failed to send email. Please try again or contact us directly.');
}
?>

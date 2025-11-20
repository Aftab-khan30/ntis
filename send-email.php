<?php
/**
 * NEXA TECH IT SOLUTIONS - Contact Form Handler
 * PHP Backend for Email Sending
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response header
header('Content-Type: application/json');

// CORS headers (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$config = [
    'recipient_email' => 'info@nexatechitsolutions.com', // Change to your email
    'recipient_name' => 'NEXA TECH IT SOLUTIONS',
    'subject_prefix' => '[Contact Form]',
    'from_email' => 'noreply@nexatechitsolutions.com', // Change to your domain email
];

// Response function
function sendResponse($success, $message, $data = []) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Validate email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method. Only POST requests are allowed.');
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// If JSON decode fails, try regular POST
if ($data === null) {
    $data = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

if (!empty($errors)) {
    sendResponse(false, 'Validation failed', ['errors' => $errors]);
}

// Sanitize inputs
$name = sanitizeInput($data['name']);
$email = sanitizeInput($data['email']);
$phone = isset($data['phone']) ? sanitizeInput($data['phone']) : 'Not provided';
$service = isset($data['service']) ? sanitizeInput($data['service']) : 'Not specified';
$message = sanitizeInput($data['message']);

// Validate email format
if (!isValidEmail($email)) {
    sendResponse(false, 'Invalid email address');
}

// Validate name length
if (strlen($name) < 2) {
    sendResponse(false, 'Name must be at least 2 characters long');
}

// Validate message length
if (strlen($message) < 10) {
    sendResponse(false, 'Message must be at least 10 characters long');
}

// Prepare email
$subject = $config['subject_prefix'] . ' New inquiry from ' . $name;

// Email body (HTML)
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0392FC 0%, #10DCDF 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0392FC; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>{$phone}</div>
            </div>
            <div class='field'>
                <div class='label'>Service Interested In:</div>
                <div class='value'>{$service}</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form on NEXA TECH IT SOLUTIONS website.</p>
            <p>Received on: " . date('F j, Y, g:i a') . "</p>
        </div>
    </div>
</body>
</html>
";

// Plain text version
$email_body_plain = "
New Contact Form Submission
============================

Name: {$name}
Email: {$email}
Phone: {$phone}
Service: {$service}

Message:
{$message}

---
Received on: " . date('F j, Y, g:i a') . "
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $config['from_email'],
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Send email
$mail_sent = mail(
    $config['recipient_email'],
    $subject,
    $email_body,
    implode("\r\n", $headers)
);

// Send response
if ($mail_sent) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: {$name} ({$email})\n";
    @file_put_contents('contact-log.txt', $log_entry, FILE_APPEND);
    
    sendResponse(true, 'Thank you! Your message has been sent successfully. We will contact you soon.');
} else {
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again later or contact us directly.');
}
?>

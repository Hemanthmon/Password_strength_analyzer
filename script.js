function analyzePasswordStrength() { 
    const password = document.getElementById('passwordInput').value;
    const strengthIndicator = document.getElementById('strengthIndicator');
    const feedback = document.getElementById('feedback');
    const strengthMessage = document.getElementById('strengthMessage');
    const strengthEmoji = document.getElementById('strengthEmoji'); // New emoji element
    
     const result = zxcvbn(password);
    let score = 0;
    let feedbackMessages = [];
    let emoji = "😢";  // Default emoji for weak strength

    // Criteria for password strength
    if (password.length >= 8) {
        score += 1;
    } else {
        feedbackMessages.push("🔸 Password should be at least 8 characters long.");
    }

    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedbackMessages.push("🔸 Add at least one uppercase letter.");
    }

    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedbackMessages.push("🔸 Add at least one lowercase letter.");
    }

    if (/[0-9]/.test(password)) {
        score += 1;
    } else {
        feedbackMessages.push("🔸 Include at least one digit.");
    }

    if (/[\W_]/.test(password)) {
        score += 1;
    } else {
        feedbackMessages.push("🔸 Add at least one special character.");
    }

    // Update the strength meter based on the score
    const strengthPercent = (score / 5) * 100;
    strengthIndicator.style.width = `${strengthPercent}%`;
    
    // Set the color, message, and emoji based on the strength level
    if (strengthPercent <= 40) {
        strengthIndicator.style.backgroundColor = "red";
        strengthMessage.innerHTML = "🔴 Weak Password";
        strengthMessage.style.color = "red";
        emoji = "😢";  // Sad face for weak password
    } else if (strengthPercent <= 80) {
        strengthIndicator.style.backgroundColor = "orange";
        strengthMessage.innerHTML = "🟠 Medium Strength";
        strengthMessage.style.color = "orange";
        emoji = "😐";  // Neutral face for medium strength
    } else {
        strengthIndicator.style.backgroundColor = "green";
        strengthMessage.innerHTML = "🟢 Strong Password";
        strengthMessage.style.color = "green";
        emoji = "😄";  // Happy face for strong password
    }

    // Update the emoji display above the heading
    strengthEmoji.innerHTML = emoji;

    // Display feedback messages
    feedback.innerHTML = feedbackMessages.join("<br>");
 
    const crackTime = result.crack_times_display.offline_fast_hashing_1e10_per_second;
    document.getElementById("crackTime").innerText = `Estimated time to crack: ${crackTime}`;
}

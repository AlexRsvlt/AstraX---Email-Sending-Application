console.log("Script is running");

function loginUser(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simulate authentication (replace with actual logic in real apps)
    if (email && password) {
        alert("Login successful!"); // Optional feedback
        window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
        alert("Invalid credentials!"); // Feedback for invalid input
    }
    return false;
}


function replacePlaceholders(template, row) {
    return template.replace(/{(\w+)}/g, (_, placeholder) => row[placeholder] || `{${placeholder}}`);
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const previewButton = document.getElementById("preview-button");
    const sendEmailsButton = document.getElementById("send-emails-button");
    const promptInput = document.getElementById("prompt-input");
    const emailPreviewContainer = document.getElementById("email-preview-container");
    const apiStatus = document.getElementById("api-status");
    const emailStatusTable = document.getElementById("email-status-table").getElementsByTagName('tbody')[0];
    const emailProgressBar = document.getElementById("email-sending-progress");
    const progressText = document.getElementById("progress-text");

    let csvData = []; // To store parsed CSV data
    let emailStatus = []; // To track the status of sent emails

    // Analytics counters
    let totalSent = 0;
    let emailsPending = 0;
    let emailsFailed = 0;
    let emailsScheduled = 0;

    // Update analytics dashboard counters
    function updateAnalytics() {
        document.getElementById("total-sent").textContent = totalSent;
        document.getElementById("emails-pending").textContent = emailsPending;
        document.getElementById("emails-scheduled").textContent = emailsScheduled;
        document.getElementById("emails-failed").textContent = emailsFailed;
    }

    // Parse and upload CSV file
    uploadButton.addEventListener("click", function () {
        const file = fileInput.files[0];
        if (file && file.type === "text/csv") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                csvData = parseCSV(contents);
                emailsPending = csvData.length; // Set pending emails to the CSV data length
                updateAnalytics(); // Update analytics after CSV load
                alert("File uploaded successfully!");
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid CSV file.");
        }
    });

    // Generate previews
    previewButton.addEventListener("click", function () {
        const promptTemplate = promptInput.value;
        if (!promptTemplate || csvData.length === 0) {
            alert("Please enter a prompt and upload a CSV file first.");
            return;
        }

        emailPreviewContainer.innerHTML = "";
        csvData.forEach((row, index) => {
            const emailContent = replacePlaceholders(promptTemplate, row);
            const emailPreview = document.createElement("div");
            emailPreview.className = "email-preview-box";
            emailPreview.innerHTML = ` 
                <h3>Email Preview ${index + 1}</h3>
                <p>${emailContent}</p>
            `;
            emailPreviewContainer.appendChild(emailPreview);
        });
    });

    // Send Emails using Groq API
    sendEmailsButton.addEventListener("click", async function () {
        const promptTemplate = promptInput.value;
        if (!promptTemplate || csvData.length === 0) {
            alert("Please enter a prompt and upload a CSV file first.");
            return;
        }

        apiStatus.textContent = "Sending emails, please wait...";
        totalSent = 0;
        emailsPending = csvData.length;
        emailsFailed = 0;
        emailsScheduled = 0;

        for (const [index, row] of csvData.entries()) {
            const emailContent = replacePlaceholders(promptTemplate, row);

            try {
                console.log(`Sending request for email ${index + 1}:`, emailContent);
                const response = await sendToGroqAPI(emailContent);
                console.log(`Email ${index + 1} response:`, response);

                // Update email status table and progress bar
                emailStatus.push({
                    company: row.Company || "N/A",
                    recipient: row.Name || "N/A",
                    email: row.Email || "N/A",
                    status: "Sent",
                    deliveryStatus: "Delivered",
                    opened: "Yes",
                });
                totalSent++; // Increment total sent
                emailsPending--; // Decrease pending count
                updateProgressBar(totalSent, csvData.length); // Update progress bar
                updateAnalytics(); // Update real-time analytics
            } catch (error) {
                console.error(`Error sending email ${index + 1}:`, error);
                emailStatus.push({
                    company: row.Company || "N/A",
                    recipient: row.Name || "N/A",
                    email: row.Email || "N/A",
                    status: "Failed",
                    deliveryStatus: "Bounced",
                    opened: "No",
                });
                emailsFailed++; // Increment failed count
                emailsPending--; // Decrease pending count
                updateProgressBar(totalSent, csvData.length); // Update progress bar
                updateAnalytics(); // Update real-time analytics
            }
            updateEmailStatusTable(); // Update table after each email
        }

        apiStatus.textContent = "Email sending complete!";
    });

    // Parse CSV contents
    function parseCSV(contents) {
        const rows = contents.split("\n").map((row) => row.trim());
        const headers = rows[0].split(","); // Extract headers
        return rows.slice(1).map((row) => {
            const values = row.split(",");
            return headers.reduce((acc, header, index) => {
                acc[header.trim()] = values[index] ? values[index].trim() : "";
                return acc;
            }, {});
        });
    }

    // Update email status table
    function updateEmailStatusTable() {
        emailStatusTable.innerHTML = "";
        emailStatus.forEach((status) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${status.company}</td>
                <td>${status.recipient}</td>
                <td>${status.email}</td>
                <td>${status.status}</td>
                <td>${status.deliveryStatus}</td>
                <td>${status.opened}</td>
            `;
            emailStatusTable.appendChild(row);
        });
    }

    // Update progress bar
    function updateProgressBar(emailsSent, totalEmails) {
        const progress = (emailsSent / totalEmails) * 100;
        emailProgressBar.value = progress;
        progressText.textContent = `${Math.round(progress)}% Sent`;
    }

    // Mock API request function (for Groq API)
    async function sendToGroqAPI(content) {
        // This is where you'd call the actual Groq API
        // Returning a resolved promise to simulate successful email sending
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }
});

document.getElementById("domainForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        regNo: document.getElementById("regNo").value,
        email: document.getElementById("email").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        pref1: document.getElementById("pref1").value,
        pref2: document.getElementById("pref2").value,
        pref3: document.getElementById("pref3").value
    };

    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    // ✅ Validation: Ensure Preferences Are Unique
    if (formData.pref1 === formData.pref2 || formData.pref1 === formData.pref3 || formData.pref2 === formData.pref3) {
        popup.classList.add("error");
        popupMessage.innerHTML = "⚠️ Preferences must be different!";
        popup.classList.add("visible");
        setTimeout(() => popup.classList.remove("visible"), 3000);
        return; // ❌ Stop form submission
    }

    try {
        const response = await fetch("https://form-three-nu.vercel.app/submit-form", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
            mode: "cors",  // ✅ Ensures CORS request is handled correctly
            credentials: "omit" // ✅ Ensures no credentials are sent
        });    

        const result = await response.json();

        if (response.ok) {
            popup.classList.remove("error");
            popupMessage.innerHTML = "✅ Successfully Submitted!";
        } else {
            popup.classList.add("error");
            popupMessage.innerHTML = "⚠️ Your form is already submitted!";
        }

        popup.classList.add("visible");
        setTimeout(() => popup.classList.remove("visible"), 3000);
    } catch (error) {
        console.error("Error:", error);
        popup.classList.add("error");
        popupMessage.innerHTML = "❌ Failed to submit form. Try again!";
        popup.classList.add("visible");
        setTimeout(() => popup.classList.remove("visible"), 3000);
    }
});

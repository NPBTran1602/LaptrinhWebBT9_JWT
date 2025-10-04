$(document).ready(function() {

    // ===== Khi ở trang profile =====
    if (window.location.pathname === "/profile") {
        $.ajax({
            type: "GET",
            url: "/users/me",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
                if (localStorage.token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.token);
                }
            },
            success: function(data) {
                $("#profile").html(data.fullName);
                $("#images").attr("src", data.imageUrl || "https://via.placeholder.com/150");
            },
            error: function(e) {
                alert("⚠️ Token invalid or expired, please login again!");
                localStorage.clear();
                window.location.href = "/login";
            }
        });
    }

    // ===== Xử lý nút Login =====
    $("#login").click(function() {
        const email = $("#email").val();
        const password = $("#password").val();

        const loginInfo = JSON.stringify({ email: email, password: password });

        $.ajax({
            type: "POST",
            url: "/auth/login",
            data: loginInfo,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                localStorage.token = data.token;
                alert("✅ Login success!");
                window.location.href = "/profile";
            },
            error: function() {
                alert("❌ Login failed! Please check your credentials.");
            }
        });
    });

    // ===== Xử lý Logout =====
    $("#logout").click(function() {
        localStorage.clear();
        alert("👋 Logged out!");
        window.location.href = "/login";
    });
});

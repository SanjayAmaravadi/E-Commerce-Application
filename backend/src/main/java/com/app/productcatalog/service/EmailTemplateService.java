package com.app.productcatalog.service;

import org.springframework.stereotype.Service;

@Service
public class EmailTemplateService {

    /*
        MAIN LAYOUT
    */

    private String buildLayout(
            String title,
            String subtitle,
            String content
    ) {

        return """
                <!DOCTYPE html>
                <html>
                
                <head>
                
                    <meta charset="UTF-8">
                
                    <style>
                
                        body{
                            margin:0;
                            padding:40px;
                            background:#f4f7fb;
                            font-family:Arial,sans-serif;
                        }
                
                        .container{
                            max-width:550px;
                            margin:auto;
                            background:white;
                            border-radius:20px;
                            overflow:hidden;
                            box-shadow:0 5px 20px rgba(0,0,0,0.08);
                        }
                
                        .header{
                            background:#111827;
                            color:white;
                            padding:35px;
                            text-align:center;
                        }
                
                        .header h1{
                            margin:0;
                            font-size:28px;
                        }
                
                        .body{
                            padding:40px;
                            text-align:center;
                        }
                
                        .body h2{
                            margin-top:0;
                            color:#111827;
                        }
                
                        .body p{
                            color:#555;
                            line-height:1.7;
                        }
                
                        .otp{
                            display:inline-block;
                            margin:25px 0;
                            background:#111827;
                            color:white;
                            padding:18px 35px;
                            border-radius:14px;
                            font-size:32px;
                            font-weight:bold;
                            letter-spacing:8px;
                        }
                
                        .button{
                            display:inline-block;
                            margin-top:25px;
                            background:#111827;
                            color:white !important;
                            padding:14px 30px;
                            text-decoration:none;
                            border-radius:12px;
                            font-weight:bold;
                        }
                
                        .footer{
                            margin-top:35px;
                            font-size:13px;
                            color:#888;
                            line-height:1.7;
                        }
                
                    </style>
                
                </head>
                
                <body>
                
                    <div class="container">
                
                        <div class="header">
                
                            <h1>
                                Product Catalog
                            </h1>
                
                        </div>
                
                        <div class="body">
                
                            <h2>
                """ + title + """
                </h2>
                
                <p>
                """ + subtitle + """
                </p>
                
                """ + content + """
                
                            <div class="footer">
                
                                © 2026 Product Catalog
                
                            </div>
                
                        </div>
                
                    </div>
                
                </body>
                
                </html>
                """;
    }

    /*
        OTP TEMPLATE
    */

    public String buildOtpTemplate(
            String otp
    ) {

        String content = """
                <div class="otp">
                """ + otp + """
                </div>
                
                <p>
                    This OTP is valid for
                    <strong>5 minutes</strong>.
                </p>
                """;

        return buildLayout(
                "Verify Your Account",
                "Use the OTP below to continue.",
                content
        );
    }

    /*
        PASSWORD RESET TEMPLATE
    */

    public String buildPasswordResetTemplate(
            String otp
    ) {

        String content = """
                <div class="otp">
                """ + otp + """
                </div>
                
                <p>
                    Use this OTP to reset your password.
                </p>
                """;

        return buildLayout(
                "Reset Password",
                "We received a password reset request.",
                content
        );
    }

    /*
        WELCOME TEMPLATE
    */

    public String buildWelcomeTemplate(
            String name
    ) {

        String content = """
                <p>
                    Hello <strong>
                """ + name + """
                    </strong>,
                </p>
                
                <p>
                    Welcome to Product Catalog.
                </p>
                
                <p>
                    Your account has been successfully created.
                </p>
                """;

        return buildLayout(
                "Welcome To Product Catalog",
                "Your account is now ready.",
                content
        );
    }

    /*
        ADMIN INVITE TEMPLATE
    */

    public String buildAdminInviteTemplate(
            String inviteLink
    ) {

        String content = """
                <p>
                    You have been invited as an admin.
                </p>
                
                <a href="
                """ + inviteLink + """
                " class="button">
                
                    Create Admin Account
                
                </a>
                """;

        return buildLayout(
                "Admin Invitation",
                "Complete your admin account setup.",
                content
        );
    }
}
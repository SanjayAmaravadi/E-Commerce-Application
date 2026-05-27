package com.app.productcatalog.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    /*
        OTP EMAIL
    */
    public void sendOtpEmail(String to, String otp){
        Context context = new Context();
        context.setVariable("otp", otp);

        String html = templateEngine.process("emails/otp-email", context);
        sendHtmlEmail(to, "SJ Store | Verify Your Account", html);
    }

    /*
        RESET PASSWORD EMAIL
    */

    public void sendPasswordResetOtp(String to, String otp){
        Context context = new Context();
        context.setVariable("otp", otp);

        String html = templateEngine.process("emails/reset-password-email", context);
        sendHtmlEmail(to, "SJ Store | Reset Your Password", html);
    }

    /*
        WELCOME EMAIL
    */

    public void sendWelcomeEmail(String to, String name){
        Context context = new Context();
        context.setVariable("name", name);

        String html = templateEngine.process("emails/welcome-email", context);
        sendHtmlEmail(to, "Welcome To SJ Store", html);
    }

    /*
        ADMIN INVITE
    */

    public void sendAdminInviteEmail(String to, String inviteLink){
        Context context = new Context();
        context.setVariable("inviteLink", inviteLink);

        String html = templateEngine.process("emails/admin-invite-email", context);
        sendHtmlEmail(to, "SJ Store | Admin Invitation", html);
    }

    /*
        COMMON
    */

//    private void sendHtmlEmail(String to, String subject, String html){
//
//        try {
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//            helper.setTo(to);
//            helper.setSubject(subject);
//            helper.setText(html, true);
//
//            mailSender.send(message);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to send email");
//        }
//    }

    private void sendHtmlEmail(String to, String subject, String html){

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

        /*
            PROFESSIONAL SENDER
        */

            helper.setFrom(
                    "yourgmail@gmail.com",
                    "SJ Store"
            );

            helper.setTo(to);

            helper.setSubject(subject);

            helper.setText(html, true);

        /*
            IMPORTANT HEADERS
        */

            message.addHeader("X-Mailer", "Spring Boot Mail Service");

            message.addHeader(
                    "List-Unsubscribe",
                    "<mailto:yourgmail@gmail.com>"
            );

            mailSender.send(message);

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Failed to send email"
            );
        }
    }
}

//package com.app.productcatalog.service;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class EmailService {
//
//    private final JavaMailSender mailSender;
//
//    public void sendOtpEmail(String to, String otp){
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Product Catalog OTP Verification");
//        message.setText(
//                "Your OTP is: " + otp +
//                        "\n\nOTP valid for 5 minutes."
//        );
//        mailSender.send(message);
//    }
//}
package com.adoptify.contactanos.servicios;

import com.adoptify.contactanos.entidades.EmailDTO;
import com.adoptify.contactanos.repositorio.repositorioMensaje;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class emalilServicesImp implements IEmailService{
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    /*@Autowired(required = false)
    private final repositorioMensaje repo;*/

    public emalilServicesImp(JavaMailSender javaMailSender, TemplateEngine templateEngine) {

        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        //this.repo=repo;
    }

    @Override
    public void sendMail(EmailDTO email) throws MessagingException {
        try {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true, "UTF-8");

        helper.setTo(email.getDestinatario());
        helper.setSubject(email.getAsunto());

        //helper.setText(email.getMensaje()); {esto solo si se quiere agregar un texto plano}

        Context context = new Context();
        context.setVariable("message", email.getMensaje());
        String contentHTML = templateEngine.process("email", context);
        helper.setText(contentHTML, true);
        javaMailSender.send(message);
        } catch (Exception e){
            throw new RuntimeException("Error al enviar el correo" + e.getMessage(),e);
        }

    }
    @Override
    public void sendConfirmationEmail(String destinatario) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject("Confirmación de Contacto");

            Context context = new Context();
            context.setVariable("mensaje", "Gracias por comunicarte con Adoptify, nos pondremos en contacto contigo a la brevedad.");
            String contentHTML = templateEngine.process("emailConfirmation", context);
            helper.setText(contentHTML, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo de confirmación: " + e.getMessage(), e);
        }
    }


}

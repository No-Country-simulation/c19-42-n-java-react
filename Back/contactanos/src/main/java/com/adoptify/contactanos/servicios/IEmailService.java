package com.adoptify.contactanos.servicios;

import com.adoptify.contactanos.entidades.EmailDTO;
import jakarta.mail.MessagingException;

public interface IEmailService  {
    public void sendMail(EmailDTO email) throws MessagingException;
    public void sendConfirmationEmail(String recipientEmail) throws MessagingException;

}

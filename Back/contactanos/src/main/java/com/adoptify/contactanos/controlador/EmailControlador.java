package com.adoptify.contactanos.controlador;

import com.adoptify.contactanos.entidades.EmailDTO;
import com.adoptify.contactanos.servicios.IEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailControlador {

    @Autowired
    IEmailService emailService;

    @PostMapping("/send")
    private ResponseEntity<String> sendEmail(@RequestBody EmailDTO email) throws MessagingException {
        emailService.sendMail(email);
        return new ResponseEntity<>("Correo enviado exitosamente", HttpStatus.OK);
    }

    @PostMapping("/contactanos")
    public ResponseEntity<String> enviarContacto(@RequestBody EmailDTO emailDTO) {
        try {
            //emailService.sendMail(emailDTO);
            emailService.sendConfirmationEmail(emailDTO.getDestinatario());
            return new ResponseEntity<>("Correo de confirmacion enviado exitosamente", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al enviar el correo electronico", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

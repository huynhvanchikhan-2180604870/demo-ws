package com.hock.tour_booking.controllers;


import com.hock.tour_booking.config.JwtProvider;
import com.hock.tour_booking.dtos.HostRegisterDTO;
import com.hock.tour_booking.dtos.RoleDTO;
import com.hock.tour_booking.dtos.UserDTO;
import com.hock.tour_booking.dtos.mapper.HostRegisterDtoMapper;
import com.hock.tour_booking.dtos.mapper.RoleDtoMapper;
import com.hock.tour_booking.dtos.mapper.UserDtoMapper;
import com.hock.tour_booking.dtos.request.*;
import com.hock.tour_booking.dtos.response.AuthResponse;
import com.hock.tour_booking.dtos.response.CheckUserStatusResponse;
import com.hock.tour_booking.entities.HostRegister;
import com.hock.tour_booking.entities.Role;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.RoleRepository;
import com.hock.tour_booking.repositories.UserRepository;
import com.hock.tour_booking.services.CustomUserDetailsServiceImplementation;
import com.hock.tour_booking.services.EmailService;
import com.hock.tour_booking.services.HostRegisterService;
import com.hock.tour_booking.utils.settings.VerifyCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private com.hock.tour_booking.services.UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CustomUserDetailsServiceImplementation customUserDetailsService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private HostRegisterService hostRegisterService;

    private static final String GOOGLE_TOKEN_VERIFICATION_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequets authRequets) {
        String email = authRequets.getEmail();
        String password = authRequets.getPassword();
        User userLogin = userRepository.findByEmail(email);
        userLogin.setLast_login(LocalDateTime.now());
        userRepository.save(userLogin);

        Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserRequets requets) throws Exception {
        String verificationCode = VerifyCode.generateVerificationCode();
        String email = requets.getEmail();
        String password = requets.getPassword();
        String username = requets.getUsername();
        String phone_number = requets.getPhone_number();
        String address = requets.getAddress();
        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {

            throw new Exception("Email Already Exists");
        }

        User createUser = new User();
        createUser.setEmail(email);
        createUser.setId(UUID.randomUUID());
        createUser.setUsername(username);
        createUser.setPassword_hash(password);
        createUser.setPhone_number(phone_number);
        createUser.setAddress(address);
        createUser.setLast_login(LocalDateTime.now());
        createUser.setIs_active(false);
        createUser.setVerify_code(verificationCode);
        User saveUser = userService.addUser(createUser);
        String message = "Your verification code is: " + verificationCode;
        emailService.sendVerificationCode(email, message, "Email Verification Code");
        UserDTO userDTO = UserDtoMapper.toUserDto(saveUser);
        return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyCodeRequest request) throws Exception {
        // Xác minh mã từ người dùng gửi lên có khớp với mã đã lưu trong DB không
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new BadCredentialsException("Invalid Email");
        }


        if (VerifyCode.codeMatches(user.getVerify_code(), request.getVerify_code())) {
            Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), request.getPassword());
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtProvider.generateToken(auth);
            AuthResponse authResponse = new AuthResponse(token, true);
            user.setIs_active(true);
            User saveUser = userService.updateUser( user);
            String message = "Congratulations, you have successfully verified your account.";
            emailService.sendVerificationCode(user.getEmail(), message, "Authentication successful");
            return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code.");
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogleToken(@RequestBody String request) {
        String token = request;
        String verificationUrl = GOOGLE_TOKEN_VERIFICATION_URL + token;
        RestTemplate restTemplate = new RestTemplate();
        AuthResponse authResponse = null;
        try {
            // Gửi yêu cầu xác thực tới Google
            ResponseEntity<Map> response = restTemplate.getForEntity(verificationUrl, Map.class);
            Map<String, Object> payload = response.getBody();
            if (payload != null) {
                // Trích xuất thông tin người dùng từ phản hồi
                String email = (String) payload.get("email");
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String password = (String) payload.get("email");
                User isEmailExist = userRepository.findByEmail(email);
                CheckUserStatusResponse response_auth = new CheckUserStatusResponse();
                if (isEmailExist != null) {

                    Authentication auth = new UsernamePasswordAuthenticationToken(email, email);  // Unreachable
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    String jwt = jwtProvider.generateToken(auth);
                    authResponse = new AuthResponse(jwt, true);
                    return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
                } else {
                    User createUser = new User();
                    createUser.setEmail(email);
                    createUser.setId(UUID.randomUUID());
                    createUser.setUsername(name);
                    createUser.setPassword_hash(password);
                    createUser.setLast_login(LocalDateTime.now());
                    createUser.setIs_active(true);
                    User savedUser = userService.addUser(createUser);
                    Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    String jwt = jwtProvider.generateToken(auth);

                    authResponse = new AuthResponse(jwt, true);
                    String message = "Congratulations, you have successfully verified your account.";
                    emailService.sendVerificationCode(createUser.getEmail(), message, "Authentication successful");
                    return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
                }
            }
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username or password");
        }
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }
    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@RequestBody RoleRequets roleRequets){
        Role role = new Role();
        role.setId(UUID.randomUUID());
        role.setName(roleRequets.getName());
        return ResponseEntity.ok(roleRepository.save(role));
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @PostMapping("update")
    public ResponseEntity<UserDTO> updateRoleHost(@RequestHeader("Authorization") String jwt, @RequestBody UpdateHostRole request) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        userService.updateHostRole(user.getId(), request.getRoleId());
        UserDTO userDTO = UserDtoMapper.toUserDto(user);
        return new ResponseEntity<>(userDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<RoleDTO>> getRole() throws Exception {
        List<Role> roles = roleRepository.findAll();
        List<RoleDTO> roleDTOs = RoleDtoMapper.toRoleDTOs(roles);
        return new ResponseEntity<>(roleDTOs, HttpStatus.ACCEPTED);
    }

    @PostMapping("check")
    public ResponseEntity<?> checkStatus(@RequestBody AuthRequets authRequets) throws Exception{
        User user = userService.findUserByEmail(authRequets.getEmail());
        CheckUserStatusResponse response = new CheckUserStatusResponse();
        if(user == null){
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }

        if(!user.getIs_ban()){
            response.setMessage("Đăng nhập thành công");
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.setMessage("Tài khoản bạn bị khóa vui lòng liên hệ hotline để được hổ trợ");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register-host")
    public ResponseEntity<?> registerHost(@RequestBody HostRegisterDTO request) throws Exception{
        HostRegister newHost = hostRegisterService.checkExist(request.getEmail());
        CheckUserStatusResponse reponse = new CheckUserStatusResponse();
        if(newHost != null){
            reponse.setMessage("Email của bạn đã từng đăng ký làm nhà cung cấp tour. Nếu đang trong quá trình chờ duyệt vui longf không đăng kys lại");
            reponse.setStatus(false);
            return new ResponseEntity<>(reponse, HttpStatus.OK);
        }
        newHost = new HostRegister();
        newHost.setEmail(request.getEmail());
        newHost.setCin(request.getCin());
        newHost.setAddress(request.getAddress());
        newHost.setPhoneNumber(request.getPhoneNumber());
        newHost.setUsername(request.getUsername());
        newHost.setPassword(request.getPassword());
        HostRegister save = hostRegisterService.register(newHost);
        emailService.sendHostRegistrationApprovalPending(save);
        reponse.setMessage("Cảm ơn bạn đã gửi thông tin đăng ký làm nhà cung cấp tour. Chúng tôi sẽ xem xét và phản hồi lại sớm nhất qua email đăng ký");
        reponse.setStatus(true);
        return new ResponseEntity<>(reponse, HttpStatus.OK);
    }
}

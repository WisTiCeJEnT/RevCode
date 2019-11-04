*** Settings ***
Library    Selenium2Library
Library    BuiltIn
Library    String
Test Teardown    Close Browser
Suite Teardown     Close All Browsers

*** Variable ***
${url}                  https://wisticejent.github.io/RevCode/
${title}                RevCode  

${signup_btn}           //button[contains(text(), "Sign Up")]
${login_btn}           //button[contains(text(), "Log In")]
${login_submit_btn}           //button[contains(text(), "Login")]
${signup_user_field}        //*[@name="username"]
${signup_email_field}       //*[@name="email"]
${signup_pass_field}        //*[@name="password"]
${signup_con_pass_field}    //*[@name="cpassword"]
${login_email_field}       //*[@name="email"]
${login_pass_field}        //*[@name="password"]

${username_success}         system_testing_username
${email_success}            system_testing@revcode.com
${password_success}         system_testing_password

${input_pass}           //*[@name="password"]

${btn_login}            //*[@class="button-login btn-block py-2 ld-ext-right mt-4 btn btn-secondary"]
${username_fail}        username
${password_fail}        password
${txt_out}              //*[contains(text(), "รหัสร้านค้า หรือ รหัสผ่าน ไม่ถูกต้อง")]
${txt_in}               //*[contains(text(), "ออกจากระบบ")]
${user_nav}             //*[@class="dropdown-toggle nav-link"]
${btn_logout}           //button[contains(text(), "ออกจากระบบ")]
${btn_logout_confirm}   //button[@class="swal2-confirm swal2-styled"]
${btn_logout_cancel}    //button[@class="swal2-cancel swal2-styled"]

*** Keywords ***
Register Keyword To Run On Failure None
Verify page title
    [Arguments]                ${title}
    Title Should Be            ${title}
Input Signup Info
    [Arguments]      ${username}    ${email}    ${password}     ${cpassword}
    Element Should Be Visible    ${signup_user_field}
    Element Should Be Visible    ${signup_email_field}
    Element Should Be Visible    ${signup_pass_field}
    Element Should Be Visible    ${signup_con_pass_field}
    Input Text       ${signup_user_field}       ${username}
    Input Text       ${signup_email_field}       ${email}
    Input Text       ${signup_pass_field}       ${password}
    Input Text       ${signup_con_pass_field}       ${cpassword}
Input Login Info
    [Arguments]      ${email}    ${password}
    Element Should Be Visible    ${login_email_field}
    Element Should Be Visible    ${login_pass_field}
    Input Text       ${login_email_field}       ${email}
    Input Text       ${login_pass_field}       ${password}
Click Button
    [Arguments]       ${btn}
    Wait Until Page Contains Element    ${btn}
    Click Element        ${btn}
Text Should Be Visible
    [Arguments]       ${text}
    Wait Until Page Contains Element    //*[contains(text(), "${text}")]
    Element Should Be Visible           //*[contains(text(), "${text}")]


*** Test Cases ***
Signup - Bad Password
    [tags]  Fail
    Open Browser    about:blank    chrome
    Go To                                   ${url}
    Verify page title                       ${title}
    Maximize Browser Window
    Element Should Be Visible               ${signup_btn}
    Click Button                            ${signup_btn}
    Input Signup Info                       ${username_success}  ${email_success}  "pass"  "pas"
    Click Button                            ${signup_btn}
    Text Should Be Visible                  Your password and confirm password don't match
    Input Signup Info                       ${username_success}  ${email_success}  "pas"  "pas"
    Click Button                            ${signup_btn}
    Text Should Be Visible                  Password should be at least 6 characters

Signup - Success
    [tags]  Success
    Open Browser    about:blank    chrome
    Go To                                   ${url}
    Verify page title                       ${title}
    Maximize Browser Window
    Element Should Be Visible               ${signup_btn}
    Click Button                            ${signup_btn}
    Input Signup Info                       ${username_success}  ${email_success}  ${password_success}  ${password_success}
    Click Button                            ${signup_btn}
    Alert Should Be Present                 Successfully Registered

Signup - Used Email
    [tags]  Fail
    Open Browser    about:blank    chrome
    Go To                                   ${url}
    Verify page title                       ${title}
    Maximize Browser Window
    Element Should Be Visible               ${signup_btn}
    Click Button                            ${signup_btn}
    Input Signup Info                       ${username_success}  ${email_success}  ${password_success}  ${password_success}
    Click Button                            ${signup_btn}
    Text Should Be Visible                  The email address is already in use by another account.

Login - Success
    [tags]  Success
    Open Browser    about:blank    chrome
    Go To                                   ${url}
    Verify page title                       ${title}
    Maximize Browser Window
    Element Should Be Visible               ${login_btn}
    Click Button                            ${login_btn}
    Input Login Info                        ${email_success}  ${password_success}
    Click Button                            ${login_submit_btn}
    Text Should Be Visible                  Files

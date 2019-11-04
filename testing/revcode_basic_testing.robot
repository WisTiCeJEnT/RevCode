*** Settings ***
Library    Selenium2Library
Library    BuiltIn
Library    String
Library    pyautogui
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

${email_pa_success}            system_testing_pa@revcode.com
${password_pa_success}         system_testing_pa


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
Click On Text
    [Arguments]       ${text}
    Wait Until Page Contains Element    //*[contains(text(), "${text}")]
    Click Element                       //*[contains(text(), "${text}")]
Text Should Be Visible
    [Arguments]       ${text}
    Wait Until Page Contains Element    //*[contains(text(), "${text}")]
    Element Should Be Visible           //*[contains(text(), "${text}")]


*** Test Cases ***
Files Management - Login
    [tags]  Success
    Open Browser    about:blank    chrome
    Go To                                   ${url}
    Verify page title                       ${title}
    Maximize Browser Window
    Element Should Be Visible               ${login_btn}
    Click Button                            ${login_btn}
    Input Login Info                        ${email_pa_success}  ${password_pa_success}
    Click Button                            ${login_submit_btn}
    Text Should Be Visible                  Files
    Click On Text                           HowTo.txt

Files Management - Select File
    [tags]  Success
    Click On Text                           HowTo.txt
    Text Should Be Visible                  \### Enjoy Coding ###

Files Management - Add File
    [tags]  Success
    Click Button                            //*[@class="add icon"] 
    Text Should Be Visible                  Add New File
    Input Text                              //*[@placeholder="File name..."]       test_add_file
    Click Button                            //*[@class="ui green button"] 
    Text Should Be Visible                  test_add_file.py
    
Files Management - Edit & Save File
    [tags]  Success
    Click On Text                           Edit your code here
    BuiltIn.Sleep                           1
    pyautogui.typewrite                     print('Revcode
    Click On Text                           Save
    Text Should Be Visible                  Successfully saved
    Click On Text                           HowTo.txt
    Click On Text                           test_add_file.py
    BuiltIn.Sleep                           2
    #Text Should Be Visible                  print('Revcode')

Files Management - Remove File
    [tags]  Success
    Click On Text                           test_add_file.py
    Click Button                            //*[@class="minus icon"] 
    Text Should Be Visible                  Do you want to delete
    Click On Text                           Yes
    BuiltIn.Sleep                           1
    Text Should Be Visible                  Files
    BuiltIn.Sleep                           1
    Element Should Not Be Visible           //*[contains(text(), "test_add_file.py")]
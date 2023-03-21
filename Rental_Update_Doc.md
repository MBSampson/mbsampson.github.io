# [Process] Website Update Instructions

   There are two versions of the website: desktop and mobile. Each of these versions has its own instructions for updating the rentals pages.
   It is important to note that you have two separate environments to perform these updates: locally and on HostGator. I will leave detailed 
   comments / instructions for you to follow. It is IMPERATIVE that you follow the instructions line by line.


## ==================== Key Terms ====================
   [MainDirectory] 
      This refers to the location where you can find all of the website's code: d_styles.css, d_styles.less, nav-script.js, script.js, m_index.html, etc. 
      See the /templates/doc_screenshots/MainDirectory.PNG file for an example of how your main directory should look
   [TemplateDirectory]
      This refers to the /templates folder (which contains two subfolders: desktop & mobile)
   [Inspector]
      To open the inspector RIGHT CLICK the anywhere on the web page and select 'Inspect' from the dropdown menu
   [MobileView]
      In the inspector toggle the mobile device view -- see the /templates/doc_screnshots/MobileViewImg.PNG and look for the yellow highlighted circle
   [SublimeText]
      This is a program we use to edit code

### ======================================== DESKTOP UPDATES ========================================

   ## Desktop - Updating the website from the "Rentals" page to the "No Rentals" page
   1. [Local] Navigate to the [TemplateDirectory] and open the 'desktop' folder
   2. [Local] COPY the 'd_RENTALS_template.html' and paste it into the [TemplateDirectory] 
   3. [Local] Rename the copied file to 'rentals_page.html'
   4. [Local] CUT the 'rentals_page.html' file you just renamed and paste it into the [MainDirectory] -- allow the system to overwrite the file
   5. [Local] In the [MainDirectory] open the 'rentals_page.html' using Chrome and verify the update locally 
   6. [HostGator] Once the update has been verified locally, open HostGator and upload 
      the 'rentals_page.html' file (from the main directory) -- allow HostGator to overwrite the existing file

   ## Desktop - Updating the website from the "No Rentals" page to the "Rentals" page
   1. [Local] Navigate to the [TemplateDirectory] and open the 'desktop' folder
   2. [Local] COPY the 'd_NORENTALS_template.html' and paste it into the [TemplateDirectory]
   3. [Local] Rename the copied file to 'rentals_page.html' 
   4. [Local] CUT the 'rentals_page.html' file you just renamed and paste it into the [MainDirectory] -- allow the system to overwrite the file
   5. [Local] In the [MainDirectory] open the 'rentals_page.html' using Chrome and verify the update locally 
   6. [HostGator] Once the update has been verified locally, open HostGator and upload 
      the 'rentals_page.html' file (from the [MainDirectory]) -- allow HostGator to overwrite the existing file


   ## Desktop - How to add a rental
   1. [Local] Navigate to the [TemplateDirectory] and open the 'desktop' folder
   2. [Local] Open the 'd_rental_unit_template.html' in [SublimeText] and duplicate its contents into a 
      temporary file -- See the /template/doc_screenshots/SublimeText_Untitled.png for more info
   3. [Local] After completing #2 then scroll through the code and follow the instructions I've left there
   4. [Local] 

   ## Desktop - Updating the website from the "No Rentals" page to the "Rentals" page
   1. Navigate to local website folder, not on Hostgator
   2. Rename the "rentals.html" file to "norentals.html"         -- This disables the 'no rental' page
   3. Rename the "inactive_rentals.html" file to "rentals.html"  -- This enables the 'rentals' page so that you can begin to add rental listings
   4. Repeat steps #2 and #3 on Hostgator
   5. Open the "d_rentals_template.html" file with Sublime Text and follow the instructions listed there
   6. Navigate to Hostgator and upload rentals.html (overwrite)




### ======================================== MOBILE UPDATES ========================================

   ## Mobile - Updating the website from the "Rentals" page to the "No Rentals" page
   1. [Local] Navigate to the [TemplateDirectory] and open the 'mobile' folder
   2. [Local] COPY the 'm_index_NO_RENTALS_template.html' and paste it into the [TemplateDirectory] 
   3. [Local] Rename the copied file to 'm_index.html'
   4. [Local] CUT the 'm_index.html' file you just renamed and paste it into the [MainDirectory] -- allow the system to overwrite the file
   5. [Local] In the [MainDirectory] open the 'm_index.html' using Chrome and verify the 
      update locally -- to see the mobile version use the [Inspector] and select the [MobileView], be sure to refresh the page after selecting the view
   6. [HostGator] Once the update has been verified locally, open HostGator and upload 
      the 'm_index.html' file (from the main directory) -- allow HostGator to overwrite the existing file

   ## Mobile - Updating the website from the "No Rentals" page to the "Rentals" page
   1. [Local] Navigate to the [TemplateDirectory] and open the 'mobile' folder
   2. [Local] COPY the 'm_index_RENTALS_template.html' and paste it into the [TemplateDirectory] 
   3. [Local] Rename the copied file to 'm_index.html'
   4. [Local] CUT the 'm_index.html' file you just renamed and paste it into the [MainDirectory] -- allow the system to overwrite the file
   5. [Local] In the [MainDirectory] open the 'm_index.html' using Chrome and verify the 
      update locally -- to see the mobile version use the [Inspector] and select the [MobileView], be sure to refresh the page after selecting the view
   6. [HostGator] Once the update has been verified locally, open HostGator and upload 
      the 'm_index.html' file (from the main directory) -- allow HostGator to overwrite the existing file 

   ## Mobile - No Rentals
   1. Open the "m_index.html" file
   2. Search (CTRL + F) for "MOBILE_RENTAL_TEMPLATE_LOCATION" (Line: 108 in m_index.html)
   3. Delete all code between the "MOBILE_RENTAL_TEMPLATE_LOCATION" and "END_MOBILE_RENTAL_TEMPLATE_LOCATION" comments
   4. Open the "m_norentals_template.html" file and follow the instructions listed there

   ## Mobile - Adding Rentals
   1. Open the "m_index.html" file
   2. Search (CTRL + F) for "MOBILE_RENTAL_TEMPLATE_LOCATION" (Line: 108 in m_index.html)
   3. Delete all code between the "MOBILE_RENTAL_TEMPLATE_LOCATION" and "END_MOBILE_RENTAL_TEMPLATE_LOCATION" comments
   4. Open the "m_rentals_template.html" file and follow the instructions listed there

   ## Mobile - Adding Rentals with already existing rentals
   1. Open the "m_index.html" file
   2. Search (CTRL + F) for "MOBILE_RENTAL_TEMPLATE_LOCATION" (Line: 108 in m_index.html)
   3. Find the end comment for the last rental, it should look like this:
      <!-- ==================== END - RENTAL #RENTAL_NUM ==================== -->
   4. Open the "m_rentals_template.html" and follow the instructions listed there for creating a new rental
   5. Paste the code for the next rental BELOW the last existing rental


   To make things easier for yourself be sure to leave a good amount of space 
   between the "MOBILE_RENTAL_TEMPLATE_LOCATION" and "END_MOBILE_RENTAL_TEMPLATE_LOCATION" sections. This will increase readability and allow you to easily figure out where rentals start and end. 
# [Process] Update Website Rentals

There are two views for the rentals pages: desktop and mobile. I'll detail the instructions for updating each view below:

## Desktop - No Rentals
1. Rename the "rentals.html" file to "inactive_rentals.html"
2. Rename the "norentals.html" file to "rentals.html"


## Desktop - Updating No Rentals to Rentals and adding a new rental
1. Rename the "rentals.html" file to "norentals.html"         -- This disables the 'no rental' page
2. Rename the "inactive_rentals.html" file to "rentals.html"  -- This enables the 'rentals' page so that you can begin to add rental listings
3. Open the "d_rentals_template.html" file and follow the instructions listed there


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
between the "MOBILE_RENTAL_TEMPLATE_LOCATION" and "END_MOBILE_RENTAL_TEMPLATE_LOCATION" sections. This will increase
readability and allow you to easily figure out where rentals start and end. 
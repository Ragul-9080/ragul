// Initialize Supabase
// Initialize Supabase
const supabaseUrl = 'https://xiupedxdvhoaigewffgm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdXBlZHhkdmhvYWlnZXdmZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1Njc0MzcsImV4cCI6MjA1ODE0MzQzN30.on9Djkv9jqghcISGhktAKMK7C_qJoOI5CQWXtvgHw1I';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// SHOW MENU
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', () =>{
            nav.classList.toggle('show')
        });
    }
}

showMenu('nav_toggle','nav_menu')

// ACTIVE & REMOVE ACTIVE
const navLink = document.querySelectorAll('.nav_link')
navLink.forEach(n => n.classList.remove('active'))

function linkAction(){
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')

    const navMenu = document.getElementById('nav_menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Contact Form Submission
// Contact Form Submission
const form = document.getElementById('submit-to-google-sheet');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('about'); // Using 'about' since that's the name in your form

        console.log('Submitting:', { name, email, message }); // This will help debug

        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) {
            console.error('Error:', error); // This will show the actual error
            swal("Error", error.message || "Something went wrong. Please try again!", "error");
        } else {
            swal("Done", "Message sent successfully!", "success");
            form.reset();
        }
    } catch (err) {
        console.error('Error:', err);
        swal("Error", "An unexpected error occurred. Please try again!", "error");
    }
});

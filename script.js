const internshipContainer = document.getElementById("internshipContainer");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const domainFilter = document.getElementById("domainFilter");

const statusMessage = document.getElementById("statusMessage");

let internships = [];

async function loadInternships() {

    statusMessage.textContent = "Loading internships...";

    try {

        const response = await fetch("internships.json");

        if (!response.ok) {
            throw new Error("Unable to load internship data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid internship data.");
        }

        internships = data;

        displayInternships(internships);

    } catch (error) {

        internshipContainer.innerHTML = "";

        statusMessage.textContent =
            "Something went wrong while loading internships. Please try again.";

        statusMessage.className = "error-message";

        console.error(error);

    }

}

function displayInternships(data) {

    internshipContainer.innerHTML = "";

    statusMessage.className = "";

    if (data.length === 0) {

        statusMessage.textContent =
            "No internships found. Try another search or filter.";

        statusMessage.className = "empty-message";

        return;

    }

    statusMessage.textContent = `${data.length} internship(s) found`;

    data.forEach(internship => {

        const card = document.createElement("article");

        card.className = "internship-card";

        const logo = document.createElement("div");
        logo.className = "company-logo";
        logo.textContent = internship.company.charAt(0);

        const title = document.createElement("h3");
        title.textContent = internship.role;

        const company = document.createElement("p");
        company.className = "company-name";
        company.textContent = internship.company;

        const domain = document.createElement("span");
        domain.className = "domain";
        domain.textContent = internship.domain;

        const details = document.createElement("div");
        details.className = "details";

        details.textContent =
            `📍 ${internship.location} | 💰 ${internship.stipend} | ⏳ ${internship.duration} | ${internship.type}`;

        const apply = document.createElement("a");
        apply.className = "apply-btn";
        apply.href = `mailto:careers@example.com?subject=${encodeURIComponent("Internship Application - " + internship.role)}`;
        apply.textContent = "Apply Now";

        card.appendChild(logo);
        card.appendChild(title);
        card.appendChild(company);
        card.appendChild(domain);
        card.appendChild(details);
        card.appendChild(apply);

        internshipContainer.appendChild(card);

    });

}

function searchInternships() {

    const searchText = searchInput.value.trim().toLowerCase();

    const selectedDomain = domainFilter.value;

    const filteredInternships = internships.filter(internship => {

        const matchesSearch =
            internship.company.toLowerCase().includes(searchText) ||
            internship.role.toLowerCase().includes(searchText);

        const matchesDomain =
            selectedDomain === "all" ||
            internship.domain === selectedDomain;

        return matchesSearch && matchesDomain;

    });

    displayInternships(filteredInternships);

}

searchBtn.addEventListener("click", searchInternships);

searchInput.addEventListener("input", searchInternships);

domainFilter.addEventListener("change", searchInternships);

loadInternships();
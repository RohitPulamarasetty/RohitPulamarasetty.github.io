// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,   // CHANGED: Allows animation to repeat every time you scroll
        mirror: true,  // ADDED: Elements animate out when you scroll past them
        offset: 100
    });
});

// --- PROJECT DATA CONFIGURATION ---
const projectData = {
    'pizza': {
        title: "Pizza Sales Analysis",
        tech: "SQL, Excel",
        desc: `
        <section class="analysis-section">
        <h3>Project Context (Business Problem)</h3>
        <p>
            Quick-service restaurants generate thousands of daily transactions, but raw sales logs
            alone do not reveal actionable business insights. Without structured analysis, it is
            difficult to understand demand patterns, pricing effectiveness, or operational bottlenecks.
        </p>
        <p>
            This project transforms raw pizza transaction data into
            <strong>decision-ready business intelligence</strong> using SQL-driven analysis,
            focusing on demand trends, revenue drivers, and customer ordering behavior.
        </p>
        </section>


        <section class="analysis-section">
        <h3>Data Cleaning & Preparation (Core Complexity)</h3>
        <p>
            Transaction-level food delivery data often contains inconsistencies such as duplicate
            orders, mismatched product names, and missing timestamps. Reliable analysis required
            structured preprocessing before aggregation.
        </p>
        <ul>
            <li>Standardized pizza names, sizes, and category labels across tables</li>
            <li>Validated order timestamps and removed incomplete transactions</li>
            <li>Resolved duplicate order entries introduced during logging</li>
            <li>Aligned pricing, quantity, and order metadata for consistency</li>
            <li>Built relational joins between orders, items, and pricing tables</li>
            <li>Prepared analysis-ready SQL views for metrics computation</li>
        </ul>
        <p>
            <strong>Result:</strong> Clean, normalized dataset enabling accurate aggregation of
            21K+ orders and revenue calculations without double counting.
        </p>
        </section>


        <section class="analysis-section">
        <h3>Feature Engineering & Business Metrics</h3>
        <p>
            Instead of relying on raw counts, custom KPIs were engineered to evaluate sales
            performance, customer preference, and operational load.
        </p>
        <ul>
            <li><strong>Total Orders:</strong> Overall transaction demand volume</li>
            <li><strong>Total Revenue:</strong> Gross sales performance</li>
            <li><strong>Size Preference Ratio:</strong> Share of each pizza size ordered</li>
            <li><strong>Category Contribution:</strong> Quantity sold per pizza category</li>
            <li><strong>Hourly Demand Curve:</strong> Peak vs off-peak workload analysis</li>
            <li><strong>Revenue per Item:</strong> High-value menu identification</li>
        </ul>
        </section>


        <section class="analysis-section">
        <h3>Analytical Insights</h3>
        <ul>
            <li>~21,350 total orders processed, indicating strong customer demand</li>
            <li>Total revenue exceeded <strong>$817K</strong>, reflecting healthy store performance</li>
            <li>Large (L) pizzas dominate orders (~38%), showing clear size preference</li>
            <li>Classic and Supreme categories contribute the highest quantities sold</li>
            <li>Specific premium pizzas command higher price points (up to $35.95)</li>
            <li>Orders cluster around lunch and evening hours, creating peak-time pressure</li>
            <li>Top pizza types disproportionately drive overall revenue contribution</li>
        </ul>
        </section>


        <section class="analysis-section">
        <h3>Impact & Practical Relevance</h3>
        <p>
            The analysis enables data-backed decisions across pricing, inventory planning,
            and staffing. Identifying high-demand hours helps optimize workforce allocation,
            while understanding category and size preferences supports targeted promotions
            and menu design.
        </p>
        <p>
            These insights directly improve revenue efficiency, reduce stock-outs,
            and enhance customer satisfaction in fast-paced food operations.
        </p>
        </section>


        <section class="analysis-section">
        <h3>Conclusion</h3>
        <p>
            This project demonstrates how <strong>SQL-based exploratory analytics</strong>
            can convert raw transactional data into strategic business intelligence.
            Through careful data preparation, metric engineering, and structured queries,
            everyday sales records were transformed into actionable operational insights
            that guide smarter restaurant management decisions.
        </p>
        </section>


        <section class="analysis-section">
        <p class="meta-info">
            <strong>Data Scope:</strong> Orders, Items, Pricing |
            <strong>Granularity:</strong> Transaction-level |
            <strong>Tools:</strong> MySQL, SQL Aggregations, Dashboard Visualization |
            <strong>Domain:</strong> Food & Retail Analytics
        </p>
        </section> 
        ` ,
        embedCode: `
            <iframe 
                class="pdf-viewer"
                src="icons/Pizza_Analysis_Presentation.pdf" 
                width="100%" 
                height="600px" 
                style="border: none; border-radius: 12px;">
            </iframe>
        `
    },
    'retail-sales': {
        title: "Retail Sales Analysis",
        tech: "SQL, Tableau",
        desc:`
        <section class="analysis-section">
            <h3>Problem Statement</h3>
            <p>
                Retail businesses often track sales at a high level but struggle to understand
                <strong>profitability drivers, customer behavior, and category-level performance</strong>.
                This project aims to analyze retail sales data to identify revenue trends,
                profit leakages, and customer contribution patterns across time and product categories.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Data Cleaning & Preparation</h3>
            <ul>
                <li>Removed duplicate order records and invalid transaction entries</li>
                <li>Standardized date formats for time-series analysis</li>
                <li>Validated sales, profit, and quantity fields to remove negative and null anomalies</li>
                <li>Created clean customer-level and order-level datasets</li>
            </ul>
            <p>
                Result: A consistent, analysis-ready dataset enabling reliable trend, category,
                and customer-level insights.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Feature Engineering & Metrics</h3>
            <ul>
                <li>Total Sales, Total Profit, and Quantity Sold</li>
                <li>Year-over-Year (YoY) growth metrics vs previous year</li>
                <li>Sales per Customer and Order Frequency</li>
                <li>Category and Sub-category Profitability Indicators</li>
            </ul>
        </section>

        <section class="analysis-section">
            <h3>Analysis & Insights</h3>
            <ul>
                <li>Overall sales increased by <strong>20.4%</strong> compared to the previous year</li>
                <li>Profit growth of <strong>14.2%</strong> indicates margin pressure despite higher revenue</li>
                <li>High-sales subcategories such as Phones and Chairs show mixed profitability</li>
                <li>Several subcategories consistently operate at a loss, signaling pricing or cost issues</li>
                <li>A small group of customers contributes disproportionately to total profit</li>
            </ul>
        </section>

        <section class="analysis-section">
            <h3>Customer Behavior Analysis</h3>
            <ul>
                <li>Customer count increased by <strong>8.6%</strong> year-over-year</li>
                <li>Order volume grew by <strong>28.3%</strong>, indicating higher purchase frequency</li>
                <li>Most customers place 1–2 orders, while a small segment drives repeat purchases</li>
                <li>Top 10 customers contribute significantly to total profit despite low order counts</li>
            </ul>
        </section>

        <section class="analysis-section">
            <h3>Dashboard & Visualization</h3>
            <p>
                Interactive Tableau dashboards were built to track sales and profit trends,
                compare yearly performance, analyze subcategory profitability, and evaluate
                customer distribution and contribution.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Impact & Outcome</h3>
            <p>
                The analysis highlights profit leakage areas, identifies high-value customers,
                and supports data-driven decisions related to pricing, inventory optimization,
                and customer retention strategies.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Conclusion</h3>
            <p>
                This project demonstrates how structured data cleaning, KPI engineering,
                and visual analytics can convert retail transaction data into
                actionable business insights for revenue growth and profitability optimization.
            </p>
        </section>
        
        <section class="analysis-section">
            <p class="meta-info">
                <strong>Data Scope:</strong> Orders, Customers, Products |
                <strong>Time Period:</strong> 2020–2023
            </p>
        </section>`,
        embedCode: `
            <div class='tableauPlaceholder' id='viz1769970813054' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Sa&#47;SalesProject_17676807508820&#47;SalesDashboard&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='SalesProject_17676807508820&#47;SalesDashboard' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Sa&#47;SalesProject_17676807508820&#47;SalesDashboard&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-GB' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1769970813054');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.minWidth='1200px';vizElement.style.maxWidth='100%';vizElement.style.minHeight='850px';vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.minWidth='1200px';vizElement.style.maxWidth='100%';vizElement.style.minHeight='850px';vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';} else { vizElement.style.width='100%';vizElement.style.minHeight='2850px';vizElement.style.maxHeight=(divElement.offsetWidth*1.77)+'px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>
        `
    },
    'aadhaar': {
        title: "UIDAI Saturation Analysis",
        tech: "Python, Tableau",
        desc: `
        <section class="analysis-section">
            <h3>Project Context (Real-World Problem)</h3>
            <p>
                The UIDAI Aadhaar ecosystem operates at massive national scale, where raw transaction
                data often contains inconsistencies caused by reporting differences, administrative
                changes, and system-level noise. Simple aggregation of such data leads to misleading
                conclusions.
            </p>
            <p>
                This project focuses on transforming raw Aadhaar enrolment and update data into
                <strong>reliable, decision-ready insights</strong> by prioritizing rigorous data
                cleaning, validation, and metric design before visualization.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Data Cleaning & Validation (Core Complexity)</h3>
            <p>
                Data cleaning was the most critical and time-consuming phase of this project.
                The raw datasets contained large-scale inconsistencies that required
                domain-aware handling rather than simple filtering.
            </p>
            <ul>
                <li>Standardized state, district, and pincode names across multiple datasets</li>
                <li>Resolved invalid and mismatched state–district mappings</li>
                <li>Identified artificial district fragmentation caused by spelling and naming variations</li>
                <li>Detected duplicate records introduced by reporting overlaps</li>
                <li>Used controlled aggregation instead of deletion to preserve true transaction volume</li>
                <li>Aligned enrolment, demographic update, and biometric update datasets to a common time window</li>
            </ul>
            <p>
                <strong>Result:</strong> ~980,000 raw records consolidated, district-level noise reduced
                by ~22%, and a geographically consistent, analysis-ready dataset created.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Feature Engineering & Stress Metrics</h3>
            <p>
                Rather than relying on raw counts, custom operational metrics were engineered to
                measure system pressure and regional imbalance.
            </p>
            <ul>
                <li><strong>Biometric Stress Index:</strong> Measures adult biometric update workload relative to national baseline</li>
                <li><strong>Adult Enrollment Risk Index:</strong> Captures migration-driven enrolment pressure</li>
                <li><strong>Child Enrollment Lag Metric:</strong> Highlights access and coverage gaps</li>
                <li><strong>Migration Churn Indicator:</strong> Identifies volatility in high-movement regions</li>
            </ul>
        </section>

        <section class="analysis-section">
            <h3>Analytical Insights</h3>
            <ul>
                <li>The Aadhaar system is now predominantly <strong>maintenance-driven</strong> rather than enrolment-driven</li>
                <li>Biometric update workload is highly uneven across states</li>
                <li>Central, eastern, and northeastern regions exhibit sustained biometric stress</li>
                <li>Weekday concentration of activity indicates operational bottlenecks</li>
                <li>Migration emerges as a major driver of district-level volatility</li>
            </ul>
        </section>

        <section class="analysis-section">
            <h3>Impact & Practical Relevance</h3>
            <p>
                This analysis provides a framework for identifying biometric stress zones,
                predicting capacity pressure, and supporting targeted infrastructure
                and staffing decisions in large public-sector systems.
            </p>
        </section>

        <section class="analysis-section">
            <h3>Conclusion</h3>
            <p>
                This project demonstrates how <strong>cleaning and validating real-world data</strong>
                is often more impactful than complex modeling. By focusing on data integrity,
                meaningful metrics, and geographic consistency, raw public datasets were converted
                into actionable operational intelligence.
            </p>
        </section>

        <section class="analysis-section">
            <p class="meta-info">
                <strong>Data Scope:</strong> Enrolments, Demographic Updates, Biometric Updates |
                <strong>Granularity:</strong> District-level |
                <strong>Domain:</strong> National Public Infrastructure
            </p>
        </section>
        `,
        embedCode: `
            <div class='tableauPlaceholder' id='viz1769884191140' style='position: relative'>
                <noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ui&#47;uidai_analysis&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript>
                <object class='tableauViz'  style='display:none;'>
                    <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
                    <param name='embed_code_version' value='3' /> 
                    <param name='site_root' value='' />
                    <param name='name' value='uidai_analysis&#47;Dashboard1' />
                    <param name='tabs' value='yes' />
                    <param name='toolbar' value='yes' />
                    <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ui&#47;uidai_analysis&#47;Dashboard1&#47;1.png' /> 
                    <param name='animate_transition' value='yes' />
                    <param name='display_static_image' value='yes' />
                    <param name='display_spinner' value='yes' />
                    <param name='display_overlay' value='yes' />
                    <param name='display_count' value='yes' />
                    <param name='language' value='en-GB' />
                </object>
            </div>                
            <script type='text/javascript'>                    
                var divElement = document.getElementById('viz1769884191140');                    
                var vizElement = divElement.getElementsByTagName('object')[0];                    
                if ( divElement.offsetWidth > 800 ) { vizElement.style.minWidth='1200px';vizElement.style.maxWidth='100%';vizElement.style.minHeight='950px';vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.minWidth='1200px';vizElement.style.maxWidth='100%';vizElement.style.minHeight='950px';vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';} else { vizElement.style.width='100%';vizElement.style.minHeight='2100px';vizElement.style.maxHeight=(divElement.offsetWidth*1.77)+'px';}                     
                var scriptElement = document.createElement('script');                    
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
                vizElement.parentNode.insertBefore(scriptElement, vizElement);                
            </script>
        `
    }
};

// Overlay Logic
const overlay = document.getElementById('project-overlay');
const titleEl = document.getElementById('overlay-title');
const descEl = document.getElementById('overlay-desc');
const techEl = document.getElementById('overlay-tech');
const visualContainer = document.querySelector('.modal-img-placeholder');

function openOverlay(id) {
    const project = projectData[id];
    
    if (project) {
        titleEl.innerText = project.title;
        techEl.innerText = project.tech;
        descEl.innerHTML = project.desc;
        
        // 1. Inject the HTML
        visualContainer.innerHTML = project.embedCode;

        // 2. Execute the Script manually (because innerHTML scripts don't run by default)
        loadTableauScript(visualContainer);

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Clear content to stop background memory usage
    setTimeout(() => {
        visualContainer.innerHTML = ''; 
    }, 300);
}

// Helper to find and run the script inside the embed code
function loadTableauScript(container) {
    const scripts = container.getElementsByTagName('script');
    Array.from(scripts).forEach(script => {
        const newScript = document.createElement('script');
        // If it has src, copy it (e.g., viz_v1.js)
        if (script.src) {
            newScript.src = script.src;
        } else {
            // If inline script, copy content
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
    });
}

// Event Listeners
overlay.addEventListener('click', (e) => {
    if(e.target === overlay) closeOverlay();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeOverlay();
});


// NAV BAR TOGGLE
// --- MOBILE MENU TOGGLE ---
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    navLinks.classList.toggle('active');
    
    // Switch icon between Bars and Times (X)
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}
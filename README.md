React Version: TicketAppA Multi-Framework Ticket Management Web Application (React Implementation)This is the React implementation of the HNG Frontend Stage 2 Task: Multi-Framework Ticket Web App.It delivers a complete, responsive, and accessible ticket management experience—including authentication, dashboard analytics, and full CRUD operations—all powered by React.js, React Router, and Tailwind CSS.

🌐 Live Preview: https://tickets-app-react-v.netlify.app/

Tech StackCategoryTechnologyPurposeFrameworkReact (with Vite)Component-based UI developmentRoutingReact Router DOMClient-side navigation & route protectionStylingTailwind CSSUtility-first CSS frameworkState/DatauseState / useEffectComponent state and lifecycle managementData SimulationlocalStorageData persistence (key: ticketapp_user, ticketapp_tickets)Notificationsreact-hot-toastAccessible, non-blocking toast notifications📂 Folder Structurereact-ticket-app/
│
├── src/
│   ├── components/
│   │   └── AuthGuard.jsx       // Route protection logic
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tickets.jsx
│   │   └── NotFound.jsx       // 404 Page
│   ├── App.jsx              // Main component and router setup
│   ├── main.jsx             // React app entry point
│   └── index.css            // Tailwind CSS imports
│
├── public/
│   └── vite.svg             // Static assets
│
├── package.json
├── vite.config.js
└── tailwind.config.js
🚀 Setup & Development InstructionsThis project was bootstrapped using Vite.1️⃣ Install DependenciesBashnpm install
2️⃣ Run Development ServerBashnpm run dev
Then open your browser at the address provided in the terminal (usually http://localhost:5173).🔐 Authentication SystemUser state (email, token) is managed using localStorage under the key ticketapp_user.The AuthGuard.jsx component (leveraging useEffect and useNavigate) is wrapped around protected routes (/dashboard, /tickets) to check for the presence of ticketapp_user.Unauthenticated users attempting to access protected routes are automatically redirected to /auth/login with a warning toast.The Logout function clears localStorage.removeItem('ticketapp_user') and redirects to /auth/login.📊 Dashboard & 🎫 Ticket Management (CRUD)FeatureReact Implementation DetailsStateuseState hook manages the list of tickets and the current form data (for the modal).Data SourceFunctions interact directly with localStorage (getTickets(), saveTickets()).RenderingTickets are rendered dynamically using the JavaScript map() method.Create/UpdateA single modal component (conditionally rendered using isModalOpen state) handles both adding a new ticket and editing an existing one based on the currentTicket.id.NavigationHandled using <Link> components and the useNavigate hook.ValidationBasic client-side validation is performed within handleSubmit functions.Validation Rulestitle: required (checked on submit).status: one of open, in_progress, or closed (controlled dropdown).🎨 Design & LayoutColor Scheme Consistency: Status indicators use standard Tailwind classes:Open → Green (bg-green-100, text-green-700)In Progress → Amber (bg-amber-100, text-amber-700)Closed → Gray (bg-gray-200, text-gray-700)Responsiveness: Achieved using Tailwind's mobile-first responsive utilities (md:, lg: prefixes).Maximum Width: The content is contained within a centered maximum width container for a clean look.🔔 NotificationsAll user feedback is delivered via the highly customizable react-hot-toast library.Single-Instance Toasts: Error toasts (e.g., login failure, validation errors) use the id option to prevent stacking, ensuring a clean UI.Custom Styling: The toasts are styled using Tailwind classes applied via the <Toaster /> component's toastOptions prop for the consistent red/green feedback.👤 Test CredentialsEmailPasswordtest@user.com123456(You can also register new users on the signup page.)📘 Notes on AccessibilitySemantic HTML: Using native HTML elements (<button>, <form>, <label>).Form Control: All form inputs are properly associated with descriptive <label> elements.Focus Management: Default browser focus rings are preserved and enhanced by Tailwind.Modal: While ARIA attributes would be used in a complex app, the simple conditional rendering provides a good foundation for screen reader focus management.📄 LicenseThis project is open-source under the MIT License.

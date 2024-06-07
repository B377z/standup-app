// frontend/components/BackOfficeLayout.js
import Link from 'next/link';

const BackOfficeLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/backoffice/proposals">Proposals</Link></li>
          <li><Link href="/backoffice/agenda">Agenda Items</Link></li>
          <li><Link href="/backoffice/notifications">Notifications</Link></li>
          <li><Link href="/backoffice/events">Events</Link></li>
          <li><Link href="/backoffice/attendees">Attendees</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 10px;
          background-color: #333;
          color: white;
        }
        nav ul li {
          margin: 0;
        }
        nav ul li a {
          color: white;
          text-decoration: none;
          padding: 10px;
          display: block;
        }
        nav ul li a:hover {
          background-color: #fff;
        }
        main {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default BackOfficeLayout;









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
    </div>
  );
};

export default BackOfficeLayout;








import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { BreadcrumbCurrentLink, BreadcrumbRoot, BreadcrumbLink} from "./ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

function PageHeader({ headerTitle, links }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const day = date.getDate();
  const month = date.toLocaleDateString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <div className="font-sans flex justify-between items-center px-7 py-5 mb-2">
      <div>
        <div className="text-xxl font-semibold">{headerTitle}</div>
        <div>
          <BreadcrumbRoot>
            {links.map((link, index) => (
                <BreadcrumbLink key={index}>
                  <Link to={link.to} className="text-gray-400">{link.name}</Link>
                </BreadcrumbLink>
            ))}
          </BreadcrumbRoot>
        </div>
      </div>
      <div>
        {day} {month} {year} {hours}:{minutes.toString().padStart(2, '0')}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  headerTitle: PropTypes.string,
  links: PropTypes.array,
}

export default PageHeader;
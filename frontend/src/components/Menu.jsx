import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';



export function Menu() {

  const userName = useSelector((state) => state.user.user.name);
  const userEmail = useSelector((state) => state.user.user.email);

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redireciona para a página de login
  }


  return (

    <>
      <nav className="fixed top-0 z-50 w-full bgColor2 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex hover:bg-gray-100 items-center !p-4 text-smhover:bg-gray-100 cursor-pointer">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="!mt-2 !mb-2 !mr-2">
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full cursor-pointer" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <div className="!w-12 !h-12 rounded-full flex justify-center items-center">
                      <FontAwesomeIcon icon={faUser} size="2x" />
                    </div>
                  </button>
                </div>
                <div className="z-50 hidden !my-2 text-base list-none bgColor3 divide-y divide-[#c8cede] rounded-sm shadow-sm" id="dropdown-user">
                  <div className="!px-4 !py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white !mb-2" role="none">
                      <strong>User:</strong> {userName}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      <strong>E-mail: </strong> {userEmail}
                    </p>
                  </div>
                  <ul className="!py-1" role="none">
                    <li>
                      <Link to="/dashboard" className="block !px-4 !py-2 text-sm text-gray-700 hover:bg-[#c8cede] " role="menuitem">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/billingCycle" className="block !px-4 !py-2 text-sm text-gray-700 hover:bg-[#c8cede] " role="menuitem">Ciclos de pagamento</Link>
                    </li>
                    
                    <li className="!block">
                      <button className="!block text-start w-full !px-4 !py-2 text-sm text-gray-700 hover:bg-[#c8cede]  cursor-pointer" role="menuitem" onClick={handleLogout}>Sign out</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bgColor3 border-gray-200  dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full !ml-3 !mr-3 px-3 pb-4 overflow-y-auto bgColor3 dark:bg-gray-800">
          <ul className="!mt-25 font-medium">
            <li className="!mb-3">
              <Link to="/dashboard" className="flex items-center !p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#c8cede] dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faTable} size="1x" />
                <span className="ms-3 !ml-2">Dashboard</span>
              </Link>
            </li>
            <li className="!mb-3">
              <Link to="/billingCycle" className="flex items-center !p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#c8cede] dark:hover:bg-gray-700 group">
                <FontAwesomeIcon icon={faMoneyCheckDollar} size="1x" />
                <span className="flex-1 ms-3 whitespace-nowrap !ml-2">Ciclos de Pagamento</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

    </>
  )
}
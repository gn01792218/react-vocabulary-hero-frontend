import useAuth from "../hooks/auth/useAuth";
import useUser from "../hooks/user/useUser";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
} from '@heroicons/react/16/solid'
function UserDropDownMenu() {
  const { logOut, accessToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton className="rounded-md flex items-center">
        <p className="mr-1">使用者</p>
        <ChevronDownIcon className="size-4 fill-white/60" />
      </MenuButton>
      <MenuItems className="bg-slate-400 p-2 min-w-[100px] flex flex-col items-center rounded-md" anchor="bottom">
        <MenuItem>
          <a className="my-drop-down-item" onClick={()=>navigate('/Setting')}>
            設定
          </a>
        </MenuItem>
        <MenuItem>
          <a className="my-drop-down-item" onClick={()=>navigate('/MyTestQuestion')}>
            我的試題
          </a>
        </MenuItem>
        <MenuItem>
          <a className="my-drop-down-item" href="/#" onClick={() => logOut({ accessToken })}>
              LogOut
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
export default UserDropDownMenu;

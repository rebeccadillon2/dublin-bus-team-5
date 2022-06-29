import Rect from "react";

export default function Nav() {
  return (
    <div className='navbar-N flex items-center justify-between md:px-6 px-4 h-16 w-100'>
      <div className='LEFT flex justify-start items-center'>
        <div>Logo</div>
        <div className='flex items-center justy-center'>
          <div className='LINK'>Journey Planner</div>
          <div className='LINK'>Routes</div>
          <div className='LINK'>Stops</div>
          <div className='LINK'>What's On</div>
        </div>
      </div>
      <div className='RIGHT'>Account</div>
    </div>
  );
}

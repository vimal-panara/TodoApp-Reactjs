
function Navbar() {
	return (
		<div>
			<nav className="flex justify-between bg-violet-800 py-4">
				<div className="logo">
					<span className="font-bold text-xl mx-8">
						iTask
					</span>
				</div>
				<div className="">
					<ul className="flex mx-8 gap-8">
						<li className="cursor-pointer hover:font-bold transition-all duration-[150ms]">Home</li>
						<li className="cursor-pointer hover:font-bold transition-all duration-[150ms]">About</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
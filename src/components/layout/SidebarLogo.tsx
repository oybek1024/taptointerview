import Logo from '@/assets/logo.png'

export const SidebarLogo = () => (
    <div className=" w-full flex items-center gap-3">
        <div>
            <img src={Logo} alt="Logo"/>
        </div>
        <div className="flex flex-col">
            <p className="text-slate-950 text-xl font-semibold">TapToInterview</p>
            <p className="text-gray-900">Tap. Talk. Hire.</p>
        </div>
    </div>
)
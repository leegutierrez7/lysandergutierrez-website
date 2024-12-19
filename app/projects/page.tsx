import Image from 'next/image'

/**
 * ProjectsPage component displays the professional experience and projects.
 */
export default function ProjectsPage() {
    return (
        <section className="space-y-8">
            <h1 className="font-semibold mb-4 text-3xl">Projects & Experience</h1>

            <h2 className="font-semibold mb-2 mt-4 text-2xl">Professional Experience</h2>

            {/* NASA Experience */}
            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-8 bg-white dark:bg-gray-800">
                {/* NASA Header with Logo */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/nasa.png"
                            alt="NASA logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl">NASA (Feb 2020 - Mar 2022)</h3>
                        <p className="text-gray-700 dark:text-gray-300">Software Engineer</p>
                    </div>
                </div>

                {/* NASA Projects */}
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-700 dark:hover:shadow-md flex gap-4 hover:shadow-sm items-center p-4 rounded-lg transition-shadow">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/flightops.jpg"
                                alt="Flight Operations Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Mission Control OS Upgrade</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Upgraded Mission Control Center’s OS from RHEL 6 to 8, enhancing security and performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Capital One Experience */}
            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-8 bg-white dark:bg-gray-800">
                {/* Capital One Header with Logo */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/capone.jpg"
                            alt="Capital One logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl">Capital One (Mar 2022 - Present)</h3>
                        <p className="text-gray-700 dark:text-gray-300">Senior Associate Software Engineer</p>
                    </div>
                </div>

                {/* Capital One Projects */}
                <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex gap-4 items-center
                          hover:shadow-sm dark:hover:shadow-md transition-shadow bg-white dark:bg-gray-700">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/golang.png"
                                alt="API Project screenshot"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">API Latency Reduction</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Rewrote legacy APIs in Go, reducing latency by 30%. Deployed on AWS with Docker & Kubernetes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

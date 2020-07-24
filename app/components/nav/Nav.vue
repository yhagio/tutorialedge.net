<template>
    <header class="bg-gray-900">
        <div class="md:flex md:justify-between">
            <div class="flex py-4 px-4 items-center justify-between">
                <div>
                    <a class="flex" href="/">
                        <img class="w-8 h-auto" src="https://images.tutorialedge.net/images/logo.svg" alt="TutorialEdge">
                        <h2 class="text-white text-xl font-semibold ml-4 mt-1">TutorialEdge.net</h2>
                    </a>
                </div>

                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" type="button" aria-label="expand mobile menu" class="text-gray-200 focus:text-white focus:outline-hidden">
                        <svg class="block h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div :class="isOpen ? 'block' : 'hidden'" class="md:block md:flex">
                <a class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" href="/courses/">📹 Courses</a>
                <button @click="isSecondMenuOpen = !isSecondMenuOpen" aria-label="expand tutorial menu" class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" :class="isSecondMenuOpen ? 'bg-gray-800' : ''" href="/tutorials/">📚 Tutorials</button>
                <a class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" href="/challenges/">🎯 Challenges</a>
                <a class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" href="/projects/">⚒️ Projects</a>
                <a class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" href="/search/">🔎 Search</a>
                <a class="font-semibold text-white block py-4 px-4 sm:py-6 hover:bg-gray-800" href="https://discuss.tutorialedge.net">💬 Forum</a>
                <a v-if="isLoggedIn" class="font-semibold text-white block py-4 px-4 sm:py-6 bg-blue-600 hover:bg-blue-600" href="/profile/">⚙️ Profile</a>
                <a v-if="!isLoggedIn" class="font-semibold text-white block py-4 px-4 sm:py-6 bg-blue-600 hover:bg-blue-600" href="/profile/">⚙️ Sign Up/In</a>

            </div>
        </div>
    
        <div v-if="isSecondMenuOpen" class="bg-white block lg:flex">
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/angular/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/angular.svg" alt="Logo" />
                Angular
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/cloud/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/cloud.svg" alt="Logo" />
                Cloud
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/compsci/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/logo.svg" alt="Logo" />
                Computer Science
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/software-engineer/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/logo.svg" alt="Logo" />
                Software Engineering
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/python/">
                <img class="w-6 h-auto mr-2" src="https://images.tutorialedge.net/images/python.svg" alt="Logo" />
                Python
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/golang/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/golang.svg" alt="Logo" />
                Golang
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/rust/">
                <img class="w-6 h-auto mr-2" src="https://images.tutorialedge.net/images/rust-logo.png" alt="Logo" />
                Rust
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/reactjs/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/reactjs.svg" alt="Logo" />
                React.js
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/vuejs/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/vuejs.svg" alt="Logo" />
                Vue.js
            </a>
            <a class="p-4 py-8 font-semibold text-gray-700 hover:bg-gray-200 flex" href="/course/webdev/">
                <img class="w-4 h-auto mr-2" src="https://images.tutorialedge.net/images/logo.svg" alt="Logo" />
                Web Development
            </a>
        </div>

    </header>
</template>

<script>
export default {
    name: 'Navbar',
    data: function() {
        return {
            isOpen: false,
            isSecondMenuOpen: false,
            isLoggedIn: false,
        }
    },
    created: function() {
        if (this.$auth.isAuthenticated()) {
            this.isLoggedIn = true;
        }
    }
}
</script>
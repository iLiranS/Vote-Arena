import CardContainer from '@/components/ui/CardContainer'
import Link from 'next/link'
import React from 'react'

export function generateMetadata() {

    return {
        title: `Vote Arena - TOS`,
        description: `Terms of service - Vote Arena`
    }
}

const page = () => {
    return (
        <CardContainer className=' w-[600px] max-w-full  mx-auto gap-2 relative'>
            <h1 className='text-2xl md:text-4xl text-center font-bold'>Privacy Policy</h1>
            <p className='w-fit self-end opacity-80 bg-slate-500/20 rounded-md px-2'>Updated : 06/10/2024</p>
            <h2 className='text-xl text-red-500 font-semibold bg-red-500/20 rounded-md w-fit px-2'>Cookies & Locals</h2>
            <section className='opacity-80'>
                This website uses Next Analytics.
                <Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md ml-1' href={'https://nextjs.org/docs/pages/building-your-application/optimizing/analytics'}>Read more</Link>
            </section>
            <section className='opacity-80'>
                I also use local storage in order to store locally the polls the users already submitted, you can reset those anytime you want.
                <Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md ml-1' href={'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'}>Local Storage</Link>
            </section>
            <h2 className='text-xl text-red-500 font-semibold bg-red-500/20 rounded-md w-fit px-2 '>Term Of Service</h2>
            <section className='flex gap-2 items-center flex-col bg-orange-400/20 px-1 rounded-md'>
                <p className='text-orange-400  ml-1 w-fit self-center'>TLDR</p>
                <p>Dont upload NSFW/harmful/unallowed content, use the website as it should be, for fun.</p>
                {/* <p className='text-orange-400 border-orange-400/20 border-2 px-1 rounded-md ml-1 w-fit self-center'>Polls will be deleted automatically after 30 days.</p> */}
            </section>
            <p className='opacity-80 my-2'>
                Welcome to Vote Arena. By accessing or using Vote Arena, you agree to abide by the following Terms of Service (the Terms). These Terms apply to all users of the site. Please read them carefully before using the site.

            </p>
            <h3 className='text-lg font-semibold'>1. General Overview</h3>
            <section className='opacity-80'>
                Vote arena is provided under  the
                <Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md ml-1' href={'https://www.gnu.org/licenses/gpl-3.0.html '}> GPL-3.0 License</Link>
                ,which governs the softwares use, modification, and distribution. However, the use of the website itself is subject to additional rules and restrictions outlined below.
                By using this site, you agree that you will comply with these Terms and any applicable local laws. If you disagree with any part of the Terms, you are prohibited from using the site.
            </section>
            <h3 className='text-lg font-semibold'>2. Acceptable Use Policy </h3>
            <ul className='opacity-80 list-disc list-inside flex flex-col gap-2'>
                To ensure the safety and integrity of our community, the following actions are prohibited on Vote Arena:

                <li>Creating, sharing, or distributing content that is illegal, harmful, abusive, threatening, defamatory, or discriminatory.</li>
                <li>Creating or sharing NSFW (Not Safe For Work) polls, including but not limited to explicit, sexual, malware, viruses, or other harmful software., content that promotes violence or discrimination., or inappropriate content.</li>
                <li>Spamming or attempting to overload the site with repeated or malicious content.</li>
                <li>Interfering with or disrupting the security of the site, services, or the site’s underlying infrastructure.</li>

                Failure to comply with these guidelines may result in immediate suspension or termination of your account, and any offending content will be removed.
            </ul>

            <h3 className='text-lg font-semibold'>3. User-Generated Content and Moderation </h3>
            <ul className='opacity-80 list-disc list-inside gap-2 flex flex-col'>
                By uploading or submitting content to Vote Arena, you affirm, represent, and warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize Vote Arena to display the content.
                <li> You are responsible for the content you post.</li>
                <li>                You grant Vote Arena a non-exclusive, worldwide, royalty-free, perpetual license to display, modify, and distribute any content you submit.
                </li>
                <li>                You agree that Vote Arena retains the right to review, modify, or delete any user-generated content, including polls, at our discretion, especially if the content violates these Terms or is deemed inappropriate.
                </li>
                <li>                We reserve the right to restrict or ban any users from the site for repeated violations.
                </li>
                <li>You must not upload any copyrighted, obscene, illegal, or harmful material.</li>
                <li>We reserve the right to remove any content that violates these terms without notice.</li>
                <li>Copyright Infringement & DMCA
                    We respect the intellectual property of others and expect our users to do the same. If you believe that any content on Vote Arena infringes upon your copyright, please contact us with the necessary details, and we will take appropriate action in accordance with the Digital Millennium Copyright Act (DMCA).

                    We reserve the right to remove any content that is found to infringe on the rights of third parties.</li>
            </ul>

            <h3 className='text-lg font-semibold'> 4. Content Ownership and Licensing </h3>
            <ul className='opacity-80 list-disc list-inside gap-2 flex flex-col'>
                The source code for Vote Arena is provided under the GNU General Public License (GPL) Version 3.0. This means you are free to:
                <li>Run, study, and modify the software for your own use.</li>
                <li>Redistribute the modified or original software under the same license.</li>
                However, while the software is licensed under the GPL-3.0, content created by users or hosted on the platform may not be governed by the same license, unless otherwise stated by the content creator.
            </ul>

            <h3 className='text-lg font-semibold'>5.  Limitation of Liability </h3>
            <section className='opacity-80'>
                The site and its services are provided on an as-is basis. To the fullest extent permitted by law, Vote Arena disclaims all warranties, express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
                We do not guarantee that the site will be error-free, uninterrupted, or free from harmful components such as viruses. We shall not be held liable for any damages arising from your use of the site.
            </section>

            <h3 className='text-lg font-semibold'> 6. Changes to These Terms </h3>
            <section className='opacity-80'>
                We reserve the right to modify or update these Terms at any time. If we make any material changes, we will provide notice via the site or other means. Your continued use of the site after any changes have been posted constitutes acceptance of the revised Terms.
            </section>
            <h3 className='text-lg font-semibold'> 7. Contact Us </h3>
            <section className='opacity-80'>
                If you have any questions or concerns about these Terms, please contact us via
                <Link className='text-violet-400 bg-violet-400/20 px-1 rounded-md ml-1' href={'mailto:liransdev@gmail.com'}>email</Link>

            </section>

        </CardContainer>
    )
}

export default page
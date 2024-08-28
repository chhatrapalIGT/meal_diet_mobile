import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import COLORS from "../constants/colors";
import CommonButton from "./Core/CommonButton";
import { useNavigation } from "@react-navigation/native";
const styles = StyleSheet.create({
    termsAndConditionContainer: { flex: 1 },
    termsAndConditionMainContent: {
        height:"100%",
        flex: 4.6,
        paddingBottom: hp(5.21),
        paddingHorizontal: wp(10.4),
        width: "100%",
        justifyContent: "flex-start",
    },
    termsAndConditionTitleView: {
        marginBottom: hp(2.72),
    },
    headingText: {
        fontSize: RFPercentage(2.4),
        marginTop: hp(3),
        marginBottom: hp(2),
        color: COLORS.greyText,
        fontFamily:'Inter_500Medium'
    },
    contentText: {
        fontSize: RFPercentage(1.9),
        marginBottom: 10,
        color: COLORS.greyText,
        fontFamily:'Inter_400Regular'

    },
    bulletContentText: {
        fontSize: RFPercentage(1.9),
        marginLeft: 20,
        color: COLORS.greyText,
        fontFamily:'Inter_400Regular'

    },
    termsAndConditionTitleText: {
        fontSize: RFPercentage(2.9),
        color: COLORS.black,
        fontFamily: "Inter_500Medium",
    },
});

const TermsAndCondition = ({
    handleTermsAndCondition,
    isLoading = false,
    mainContainerStyle,
    mainContentStyle,
    mainFooterStyle
}) => {
    const { navigate } = useNavigation();
    return (
        <View
            style={{
                ...styles.termsAndConditionContainer,
                ...mainContainerStyle,
            }}
        >
            <View  style={{
                ...styles.termsAndConditionMainContent,
                ...mainContentStyle,
            }}>
                <View style={styles.termsAndConditionTitleView}>
                    <Text style={styles.termsAndConditionTitleText}>
                        Terms and conditions
                    </Text>
                </View>
                <View style={{height:'100%'}}>
                    <ScrollView style={{ marginBottom: hp(1.5)}}>
                        <Text style={styles.headingText}>
                            1. General Terms:
                        </Text>

                        <Text style={styles.contentText}>
                            By accessing or placing an order with Mind Diet, you
                            confirm that you are in agreement with and bound by
                            the terms of service contained in the Terms &
                            Conditions outlined below. These terms also apply to
                            the entire website and any email or other type of
                            communication between you and Mind Diet.
                        </Text>
                        <Text style={styles.contentText}>
                            Under no circumstances shall Mind Diet team be
                            liable for any direct, indirect, special, incidental
                            or consequential damages, including, but not limited
                            to, loss of data or profit, arising out of the use,
                            or the inability to use, the materials on this site,
                            even if Mind Diet team or an authorized
                            representative has been advised of the possibility
                            of such damages. If your use of materials from this
                            site results in the need for servicing, repair or
                            correction of equipment or data, you assume any
                            costs thereof.
                        </Text>
                        <Text style={styles.contentText}>
                            Mind Diet will not be responsible for any outcome
                            that may occur during the course of usage of our
                            resources. We reserve the rights to change prices
                            and revise the resources usage policy in any moment.
                        </Text>
                        <Text style={styles.headingText}>2. License:</Text>

                        <Text style={styles.contentText}>
                            Mind Diet grants you a revocable, non-exclusive,
                            non-transferable, limited license to download,
                            install and use the app strictly in accordance with
                            the terms of this Agreement.
                        </Text>
                        <Text style={styles.contentText}>
                            These Terms & Conditions are a contract between you
                            and Mind Diet (referred to in these Terms &
                            Conditions as "Mind Diet", "us", "we" or "our"), the
                            provider of the Mind Diet website and the services
                            accessible from the Mind Diet website (which are
                            collectively referred to in these Terms & Conditions
                            as the "Mind Diet Service").
                        </Text>
                        <Text style={styles.contentText}>
                            You are agreeing to be bound by these Terms &
                            Conditions. If you do not agree to these Terms &
                            Conditions, please do not use the Mind Diet Service.
                            In these Terms & Conditions, "you" refers both to
                            you as an individual and to the entity you
                            represent. If you violate any of these Terms &
                            Conditions, we reserve the right to cancel your
                            account or block access to your account without
                            notice.
                        </Text>
                        <Text style={styles.headingText}>
                            3. Definitions and key terms:
                        </Text>

                        <Text style={styles.contentText}>
                            To help explain things as clearly as possible in
                            this Terms & Conditions, every time any of these
                            terms are referenced, are strictly defined as:
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Cookie: small amount of data generated by
                            a website and saved by your web browser. It is used
                            to identify your browser, provide analytics,
                            remember information about you such as your language
                            preference or login information.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Company: when this terms mention
                            “Company,” “we,” “us,” or “our,” it refers to The
                            Food Scientist AB, (Hantverksvägen 15 - 436 33 Askim
                            - Sweden), that is responsible for your information
                            under this Terms & Conditions.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Country: where Mind Diet or the
                            owners/founders of Mind Diet are based, in this case
                            is Sweden
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Device: any internet connected device
                            such as a phone, tablet, computer or any other
                            device that can be used to visit Mind Diet and use
                            the services.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Service: refers to the service provided
                            by Mind Diet as described in the relative terms (if
                            available) and on this platform.
                        </Text>

                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Third-party service: refers to
                            advertisers, contest sponsors, promotional and
                            marketing partners, and others who provide our
                            content or whose products or services we think may
                            interest you.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} App/Application: Mind Diet app, refers to
                            the SOFTWARE PRODUCT identified above.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} You: a person or entity that is
                            registered with Mind Diet to use the Services.
                        </Text>
                        {/* Add more terms and conditions points as needed */}

                        <Text style={styles.headingText}>4. Restrictions:</Text>

                        <Text style={styles.contentText}>
                            You agree not to, and you will not permit others to:
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} License, sell, rent, lease, assign,
                            distribute, transmit, host, outsource, disclose or
                            otherwise commercially exploit the app or make the
                            platform available to any third party.
                        </Text>

                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Modify, make derivative works of,
                            disassemble, decrypt, reverse compile or reverse
                            engineer any part of the app.
                        </Text>

                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Remove, alter or obscure any proprietary
                            notice (including any notice of copyright or
                            trademark) of Mind Diet or its affiliates, partners,
                            suppliers or the licensors of the app.
                        </Text>

                        <Text style={styles.headingText}>5. Payment:</Text>

                        <Text style={styles.contentText}>
                            If you register to any of our recurring payment
                            plans, you agree to pay all fees or charges to your
                            account for the Service in accordance with the fees,
                            charges and billing terms in effect at the time that
                            each fee or charge is due and payable. Unless
                            otherwise indicated in an order form, you must
                            provide Mind Diet with a valid credit card (Visa,
                            MasterCard, or any other issuer accepted by us)
                            (“Payment Provider”) as a condition to signing up
                            for the Premium plan. Your Payment Provider
                            agreement governs your use of the designated credit
                            card account, and you must refer to that agreement
                            and not these Terms to determine your rights and
                            liabilities with respect to your Payment Provider.
                            By providing Mind Diet with your credit card number
                            and associated payment information, you agree that
                            Mind Diet is authorized to verify information
                            immediately, and subsequently invoice your account
                            for all fees and charges due and payable to Mind
                            Diet hereunder and that no additional notice or
                            consent is required. You agree to immediately notify
                            Mind Diet of any change in your billing address or
                            the credit card used for payment hereunder. Mind
                            Diet reserves the right at any time to change its
                            prices and billing methods, either immediately upon
                            posting on our Site or by e-mail delivery to your
                            organization’s administrator(s).
                        </Text>
                        <Text style={styles.contentText}>
                            Any attorney fees, court costs, or other costs
                            incurred in collection of delinquent undisputed
                            amounts shall be the responsibility of and paid for
                            by you.
                        </Text>
                        <Text style={styles.contentText}>
                            No contract will exist between you and Mind Diet for
                            the Service until Mind Diet accepts your order by a
                            confirmatory e-mail, SMS/MMS message, or other
                            appropriate means of communication.
                        </Text>
                        <Text style={styles.contentText}>
                            You are responsible for any third-party fees that
                            you may incur when using the Service.
                        </Text>

                        <Text style={styles.headingText}>
                            6. Return and Refund Policy:
                        </Text>

                        <Text style={styles.contentText}>
                            As with any shopping experience, there are terms and
                            conditions that apply to transactions at Mind Diet.
                            The main thing to remember is that by placing an
                            order or making a purchase at Mind Diet, you agree
                            to the terms along with Mind Diet’s Privacy Policy.
                        </Text>
                        <Text style={styles.contentText}>
                            If, for any reason, you are not completely satisfied
                            with any good or service that we provide, do not
                            hesitate to contact us and we will discuss any of
                            the issues you are going through with our product.
                        </Text>
                        <Text style={styles.headingText}>
                            7. Your Suggestions:
                        </Text>

                        <Text style={styles.contentText}>
                            Any feedback, comments, ideas, improvements or
                            suggestions (collectively, "Suggestions") provided
                            by you to Mind Diet with respect to the app shall
                            remain the sole and exclusive property of Mind Diet.
                        </Text>
                        <Text style={styles.contentText}>
                            Mind Diet shall be free to use, copy, modify,
                            publish, or redistribute the suggestions for any
                            purpose and in any way without any credit or any
                            compensation to you.
                        </Text>
                        <Text style={styles.headingText}>8. Your Consent:</Text>

                        <Text style={styles.contentText}>
                            We have updated our Terms & Conditions to provide
                            you with complete transparency into what is being
                            set when you visit our site and how it is being
                            used. By using our app, registering an account, or
                            making a purchase, you hereby consent to our Terms &
                            Conditions.
                        </Text>

                        <Text style={styles.headingText}>
                            9. Links to Other Websites:
                        </Text>

                        <Text style={styles.contentText}>
                            This Terms & Conditions applies only to the
                            Services. The Services may contain links to other
                            websites not operated or controlled by Mind Diet. We
                            are not responsible for the content, accuracy or
                            opinions expressed in such websites, and such
                            websites are not investigated, monitored or checked
                            for accuracy or completeness by us. Please remember
                            that when you use a link to go from the Services to
                            another website, our Terms & Conditions are no
                            longer in effect. Your browsing and interaction on
                            any other website, including those that have a link
                            on our platform, is subject to that website’s own
                            rules and policies. Such third parties may use their
                            own cookies or other methods to collect information
                            about you.
                        </Text>

                        <Text style={styles.headingText}>
                            10. Changes To Our Terms & Conditions:
                        </Text>

                        <Text style={styles.contentText}>
                            You acknowledge and agree that Mind Diet may stop
                            (permanently or temporarily) providing the Service
                            (or any features within the Service) to you or to
                            users generally at Mind Diet’s sole discretion,
                            without prior notice to you. You may stop using the
                            Service at any time. You do not need to specifically
                            inform Mind Diet when you stop using the Service.
                            You acknowledge and agree that if Mind Diet disables
                            access to your account, you may be prevented from
                            accessing the Service, your account details or any
                            files or other materials which is contained in your
                            account.
                        </Text>
                        <Text style={styles.contentText}>
                            If we decide to change our Terms & Conditions, we
                            will post those changes on the Mind diet mobile app,
                            and update the Terms & Conditions modification date.
                        </Text>

                        <Text style={styles.headingText}>
                            11. Modifications to Our app:
                        </Text>

                        <Text style={styles.contentText}>
                            Mind Diet reserves the right to modify, suspend or
                            discontinue, temporarily or permanently, the app or
                            any service to which it connects, with or without
                            notice and without liability to you.
                        </Text>

                        <Text style={styles.headingText}>
                            12. Updates to Our app:
                        </Text>

                        <Text style={styles.contentText}>
                            Mind Diet may from time to time provide enhancements
                            or improvements to the features/ functionality of
                            the app, which may include patches, bug fixes,
                            updates, upgrades and other modifications
                            ("Updates").
                        </Text>
                        <Text style={styles.contentText}>
                            Updates may modify or delete certain features and/or
                            functionalities of the app. You agree that Mind Diet
                            has no obligation to (i) provide any Updates, or
                            (ii) continue to provide or enable any particular
                            features and/or functionalities of the app to you.
                        </Text>
                        <Text style={styles.contentText}>
                            You further agree that all Updates will be (i)
                            deemed to constitute an integral part of the app,
                            and (ii) subject to the terms and conditions of this
                            Agreement.
                        </Text>

                        <Text style={styles.headingText}>
                            13. Third-Party Services:
                        </Text>

                        <Text style={styles.contentText}>
                            We may display, include or make available
                            third-party content (including data, information,
                            applications and other products services) or provide
                            links to third-party websites or services ("Third-
                            Party Services").
                        </Text>
                        <Text style={styles.contentText}>
                            You acknowledge and agree that Mind Diet shall not
                            be responsible for any Third-Party Services,
                            including their accuracy, completeness, timeliness,
                            validity, copyright compliance, legality, decency,
                            quality or any other aspect thereof. Mind Diet does
                            not assume and shall not have any liability or
                            responsibility to you or any other person or entity
                            for any Third-Party Services.
                        </Text>
                        <Text style={styles.contentText}>
                            Third-Party Services and links thereto are provided
                            solely as a convenience to you and you access and
                            use them entirely at your own risk and subject to
                            such third parties' terms and conditions.
                        </Text>

                        <Text style={styles.headingText}>
                            14. Term and Termination:
                        </Text>

                        <Text style={styles.contentText}>
                            This Agreement shall remain in effect until
                            terminated by you or Mind Diet.
                        </Text>
                        <Text style={styles.contentText}>
                            Mind Diet may, in its sole discretion, at any time
                            and for any or no reason, suspend or terminate this
                            Agreement with or without prior notice.
                        </Text>
                        <Text style={styles.contentText}>
                            This Agreement will terminate immediately, without
                            prior notice from Mind Diet, in the event that you
                            fail to comply with any provision of this Agreement.
                            You may also terminate this Agreement by deleting
                            the app and all copies thereof from your computer.
                        </Text>
                        <Text style={styles.contentText}>
                            Upon termination of this Agreement, you shall cease
                            all use of the app and delete all copies of the app
                            from your computer.
                        </Text>
                        <Text style={styles.contentText}>
                            Termination of this Agreement will not limit any of
                            Mind Diet's rights or remedies at law or in equity
                            in case of breach by you (during the term of this
                            Agreement) of any of your obligations under the
                            present Agreement.
                        </Text>

                        <Text style={styles.headingText}>
                            15. Copyright Infringement Notice:
                        </Text>

                        <Text style={styles.contentText}>
                            If you are a copyright owner or such owner’s agent
                            and believe any material on our app constitutes an
                            infringement on your copyright, please contact us
                            setting forth the following information: (a) a
                            physical or electronic signature of the copyright
                            owner or a person authorized to act on his behalf;
                            (b) identification of the material that is claimed
                            to be infringing; (c) your contact information,
                            including your address, telephone number, and an
                            email; (d) a statement by you that you have a good
                            faith belief that use of the material is not
                            authorized by the copyright owners; and (e) the a
                            statement that the information in the notification
                            is accurate, and, under penalty of perjury you are
                            authorized to act on behalf of the owner.
                        </Text>

                        <Text style={styles.headingText}>
                            15. Indemnification:
                        </Text>

                        <Text style={styles.contentText}>
                            You agree to indemnify and hold Mind Diet and its
                            parents, subsidiaries, affiliates, officers,
                            employees, agents, partners and licensors (if any)
                            harmless from any claim or demand, including
                            reasonable attorneys' fees, due to or arising out of
                            your: (a) use of the app; (b) violation of this
                            Agreement or any law or regulation; or (c) violation
                            of any right of a third party.
                        </Text>

                        <Text style={styles.headingText}>
                            16. No Warranties:
                        </Text>

                        <Text style={styles.contentText}>
                            The app is provided to you "AS IS" and "AS
                            AVAILABLE" and with all faults and defects without
                            warranty of any kind. To the maximum extent
                            permitted under applicable law, Mind Diet, on its
                            own behalf and on behalf of its affiliates and its
                            and their respective licensors and service
                            providers, expressly disclaims all warranties,
                            whether express, implied, statutory or otherwise,
                            with respect to the app, including all implied
                            warranties of merchantability, fitness for a
                            particular purpose, title and non-infringement, and
                            warranties that may arise out of course of dealing,
                            course of performance, usage or trade practice.
                            Without limitation to the foregoing, Mind Diet
                            provides no warranty or undertaking, and makes no
                            representation of any kind that the app will meet
                            your requirements, achieve any intended results, be
                            compatible or work with any other software, apps,
                            systems or services, operate without interruption,
                            meet any performance or reliability standards or be
                            error free or that any errors or defects can or will
                            be corrected.
                        </Text>
                        <Text style={styles.contentText}>
                            Without limiting the foregoing, neither Mind Diet
                            nor any Mind Diet's provider makes any
                            representation or warranty of any kind, express or
                            implied: (i) as to the operation or availability of
                            the app, or the information, content, and materials
                            or products included thereon; (ii) that the app will
                            be uninterrupted or error-free; (iii) as to the
                            accuracy, reliability, or currency of any
                            information or content provided through the app; or
                            (iv) that the app, its servers, the content,or
                            e-mails sent from or on behalf of Mind Diet are free
                            of viruses, scripts, trojan horses, worms, malware,
                            timebombs or other harmful components.
                        </Text>
                        <Text style={styles.contentText}>
                            Some jurisdictions do not allow the exclusion of or
                            limitations on implied warranties or the limitations
                            on the applicable statutory rights of a consumer, so
                            some or all of the above exclusions and limitations
                            may not apply to you.
                        </Text>

                        <Text style={styles.headingText}>
                            17. Limitation of Liability:
                        </Text>

                        <Text style={styles.contentText}>
                            Notwithstanding any damages that you might incur,
                            the entire liability of Mind Diet and any of its
                            suppliers under any provision of this Agreement and
                            your exclusive remedy for all of the foregoing shall
                            be limited to the amount actually paid by you for
                            the app.
                        </Text>
                        <Text style={styles.contentText}>
                            To the maximum extent permitted by applicable law,
                            in no event shall Mind Diet or its suppliers be
                            liable for any special, incidental, indirect, or
                            consequential damages whatsoever (including, but not
                            limited to, damages for loss of profits, for loss of
                            data or other information, for business
                            interruption, for personal injury, for loss of
                            privacy arising out of or in any way related to the
                            use of or inability to use the app, third-party
                            software and/or third-party hardware used with the
                            app, or otherwise in connection with any provision
                            of this Agreement), even if Mind Diet or any
                            supplier has been advised of the possibility of such
                            damages and even if the remedy fails of its
                            essential purpose.
                        </Text>
                        <Text style={styles.contentText}>
                            Some states/jurisdictions do not allow the exclusion
                            or limitation of incidental or consequential
                            damages, so the above limitation or exclusion may
                            not apply to you.
                        </Text>

                        <Text style={styles.headingText}>
                            18. Severability:
                        </Text>

                        <Text style={styles.contentText}>
                            If any provision of this Agreement is held to be
                            unenforceable or invalid, such provision will be
                            changed and interpreted to accomplish the objectives
                            of such provision to the greatest extent possible
                            under applicable law and the remaining provisions
                            will continue in full force and effect.
                        </Text>
                        <Text style={styles.contentText}>
                            This Agreement, together with the Privacy Policy and
                            any other legal notices published by Mind Diet on
                            the Services, shall constitute the entire agreement
                            between you and Mind Diet concerning the Services.
                            If any provision of this Agreement is deemed invalid
                            by a court of competent jurisdiction, the invalidity
                            of such provision shall not affect the validity of
                            the remaining provisions of this Agreement, which
                            shall remain in full force and effect. No waiver of
                            any term of this Agreement shall be deemed a further
                            or continuing waiver of such term or any other term,
                            and Mind Diet’s failure to assert any right or
                            provision under this Agreement shall not constitute
                            a waiver of such right or provision. YOU AND Mind
                            Diet AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF
                            OR RELATED TO THE SERVICES MUST COMMENCE WITHIN ONE
                            (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES.
                            OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY
                            BARRED.
                        </Text>

                        <Text style={styles.headingText}>19. Waiver:</Text>

                        <Text style={styles.contentText}>
                            Except as provided herein, the failure to exercise a
                            right or to require performance of an obligation
                            under this Agreement shall not effect a party's
                            ability to exercise such right or require such
                            performance at any time thereafter nor shall be the
                            waiver of a breach constitute waiver of any
                            subsequent breach.
                        </Text>
                        <Text style={styles.contentText}>
                            No failure to exercise, and no delay in exercising,
                            on the part of either party, any right or any power
                            under this Agreement shall operate as a waiver of
                            that right or power. Nor shall any single or partial
                            exercise of any right or power under this Agreement
                            preclude further exercise of that or any other right
                            granted herein. In the event of a conflict between
                            this Agreement and any applicable purchase or other
                            terms, the terms of this Agreement shall govern.
                        </Text>

                        <Text style={styles.headingText}>
                            20. Amendments to this Agreement:
                        </Text>

                        <Text style={styles.contentText}>
                            Mind Diet reserves the right, at its sole
                            discretion, to modify or replace this Agreement at
                            any time. If a revision is material we will provide
                            at least 30 days' notice prior to any new terms
                            taking effect. What constitutes a material change
                            will be determined at our sole discretion.
                        </Text>
                        <Text style={styles.contentText}>
                            By continuing to access or use our app after any
                            revisions become effective, you agree to be bound by
                            the revised terms. If you do not agree to the new
                            terms, you are no longer authorized to use Mind
                            Diet.
                        </Text>

                        <Text style={styles.headingText}>
                            21. Entire Agreement:
                        </Text>

                        <Text style={styles.contentText}>
                            The Agreement constitutes the entire agreement
                            between you and Mind Diet regarding your use of the
                            app and supersedes all prior and contemporaneous
                            written or oral agreements between you and Mind
                            Diet.
                        </Text>
                        <Text style={styles.contentText}>
                            You may be subject to additional terms and
                            conditions that apply when you use or purchase other
                            Mind Diet's services, which Mind Diet will provide
                            to you at the time of such use or purchase.
                        </Text>

                        <Text style={styles.headingText}>
                            22. Updates to Our Terms:
                        </Text>

                        <Text style={styles.contentText}>
                            We may change our Service and policies, and we may
                            need to make changes to these Terms so that they
                            accurately reflect our Service and policies. Unless
                            otherwise required by law, we will notify you (for
                            example, through our Service) before we make changes
                            to these Terms and give you an opportunity to review
                            them before they go into effect. Then, if you
                            continue to use the Service, you will be bound by
                            the updated Terms. If you do not want to agree to
                            these or any updated Terms, you can delete your
                            account.
                        </Text>

                        <Text style={styles.headingText}>
                            23. Intellectual Property:
                        </Text>

                        <Text style={styles.contentText}>
                            The app and its entire contents, features and
                            functionality (including but not limited to all
                            information, software, text, displays, images, video
                            and audio, and the design, selection and arrangement
                            thereof), are owned by Mind Diet, its licensors or
                            other providers of such material and are protected
                            by Sweden and international copyright, trademark,
                            patent, trade secret and other intellectual property
                            or proprietary rights laws. The material may not be
                            copied, modified, reproduced, downloaded or
                            distributed in any way, in whole or in part, without
                            the express prior written permission of Mind Diet,
                            unless and except as is expressly provided in these
                            Terms & Conditions. Any unauthorized use of the
                            material is prohibited.
                        </Text>

                        <Text style={styles.headingText}>
                            24. Agreement to Arbitrate:
                        </Text>

                        <Text style={styles.contentText}>
                            This section applies to any dispute EXCEPT IT DOES
                            NOT INCLUDE A DISPUTE RELATING TO CLAIMS FOR
                            INJUNCTIVE OR EQUITABLE RELIEF REGARDING THE
                            ENFORCEMENT OR VALIDITY OF YOUR OR Mind Diet’s
                            INTELLECTUAL PROPERTY RIGHTS. The term “dispute”
                            means any dispute, action, or other controversy
                            between you and Mind Diet concerning the Services or
                            this agreement, whether in contract, warranty, tort,
                            statute, regulation, ordinance, or any other legal
                            or equitable basis. “Dispute” will be given the
                            broadest possible meaning allowable under law.
                        </Text>

                        <Text style={styles.headingText}>
                            25. Notice of Dispute:
                        </Text>

                        <Text style={styles.contentText}>
                            In the event of a dispute, you or Mind Diet must
                            give the other a Notice of Dispute, which is a
                            written statement that sets forth the name, address,
                            and contact information of the party giving it, the
                            facts giving rise to the dispute, and the relief
                            requested. You must send any Notice of Dispute via
                            email to: info@thefoodscientist.com. Mind Diet will
                            send any Notice of Dispute to you by mail to your
                            address if we have it, or otherwise to your email
                            address. You and Mind Diet will attempt to resolve
                            any dispute through informal negotiation within
                            sixty (60) days from the date the Notice of Dispute
                            is sent. After sixty (60) days, you or Mind Diet may
                            commence arbitration.
                        </Text>

                        <Text style={styles.headingText}>
                            26. Binding Arbitration:
                        </Text>

                        <Text style={styles.contentText}>
                            If you and Mind Diet cannot resolve any dispute
                            through informal negotiation, the dispute will be
                            exclusively resolved through binding arbitration as
                            outlined in this section. By agreeing to this, you
                            waive your right to litigate (or participate as a
                            party or class member) all disputes in court before
                            a judge or jury. The dispute shall be settled by
                            binding arbitration in accordance with the rules of
                            the SCC Arbitration Institute of the Stockholm
                            Chamber of Commerce. Either party may seek interim
                            or preliminary injunctive relief from any court of
                            competent jurisdiction to protect their rights or
                            property pending the completion of arbitration. Any
                            and all legal, accounting, and other costs, fees,
                            and expenses incurred by the prevailing party shall
                            be borne by the non-prevailing party.
                        </Text>

                        <Text style={styles.headingText}>
                            27. Submissions and Privacy:
                        </Text>

                        <Text style={styles.contentText}>
                            In the event that you submit or post any ideas,
                            creative suggestions, designs, photographs,
                            information, advertisements, data or proposals,
                            including ideas for new or improved products,
                            services, features, technologies or promotions, you
                            expressly agree that such submissions will
                            automatically be treated as non-confidential and
                            non-proprietary and will become the sole property of
                            Mind Diet without any compensation or credit to you
                            whatsoever. Mind Diet and its affiliates shall have
                            no obligations with respect to such submissions or
                            posts and may use the ideas contained in such
                            submissions or posts for any purposes in any medium
                            in perpetuity, including, but not limited to,
                            developing, manufacturing, and marketing products
                            and services using such ideas.
                        </Text>

                        <Text style={styles.headingText}>28. Promotions:</Text>

                        <Text style={styles.contentText}>
                            Mind Diet may, from time to time, include contests,
                            promotions, sweepstakes, or other activities
                            (“Promotions”) that require you to submit material
                            or information concerning yourself. Please note that
                            all Promotions may be governed by separate rules
                            that may contain certain eligibility requirements,
                            such as restrictions as to age and geographic
                            location. You are responsible to read all Promotions
                            rules to determine whether or not you are eligible
                            to participate. If you enter any Promotion, you
                            agree to abide by and to comply with all Promotions
                            Rules.
                        </Text>
                        <Text style={styles.contentText}>
                            Additional terms and conditions may apply to
                            purchases of goods or services on or through the
                            Services, which terms and conditions are made a part
                            of this Agreement by this reference.
                        </Text>

                        <Text style={styles.headingText}>
                            29. Typographical Errors:
                        </Text>

                        <Text style={styles.contentText}>
                            In the event a product and/or service is listed at
                            an incorrect price or with incorrect information due
                            to typographical error, we shall have the right to
                            refuse or cancel any orders placed for the product
                            and/or service listed at the incorrect price. We
                            shall have the right to refuse or cancel any such
                            order whether or not the order has been confirmed
                            and your credit card charged. If your credit card
                            has already been charged for the purchase and your
                            order is canceled, we shall immediately issue a
                            credit to your credit card account or other payment
                            account in the amount of the charge.
                        </Text>

                        <Text style={styles.headingText}>
                            30. Miscellaneous:
                        </Text>

                        <Text style={styles.contentText}>
                            If for any reason a court of competent jurisdiction
                            finds any provision or portion of these Terms &
                            Conditions to be unenforceable, the remainder of
                            these Terms & Conditions will continue in full force
                            and effect. Any waiver of any provision of these
                            Terms & Conditions will be effective only if in
                            writing and signed by an authorized representative
                            of Mind Diet. Mind Diet will be entitled to
                            injunctive or other equitable relief (without the
                            obligations of posting any bond or surety) in the
                            event of any breach or anticipatory breach by you.
                            Mind Diet operates and controls the Mind Diet
                            Service from its offices in Sweden. The Service is
                            not intended for distribution to or use by any
                            person or entity in any jurisdiction or country
                            where such distribution or use would be contrary to
                            law or regulation. Accordingly, those persons who
                            choose to access the Mind Diet Service from other
                            locations do so on their own initiative and are
                            solely responsible for compliance with local laws,
                            if and to the extent local laws are applicable.
                            These Terms & Conditions (which include and
                            incorporate the Mind Diet Privacy Policy) contains
                            the entire understanding, and supersedes all prior
                            understandings, between you and Mind Diet concerning
                            its subject matter, and cannot be changed or
                            modified by you. The section headings used in this
                            Agreement are for convenience only and will not be
                            given any legal import.
                        </Text>

                        <Text style={styles.headingText}>31. Disclaimer:</Text>

                        <Text style={styles.contentText}>
                            Mind Diet is not responsible for any content, code
                            or any other imprecision. Mind Diet does not provide
                            warranties or guarantees.
                        </Text>

                        <Text style={styles.contentText}>
                            In no event shall Mind Diet be liable for any
                            special, direct, indirect, consequential, or
                            incidental damages or any damages whatsoever,
                            whether in an action of contract, negligence or
                            other tort, arising out of or in connection with the
                            use of the Service or the contents of the Service.
                            The Company reserves the right to make additions,
                            deletions, or modifications to the contents on the
                            Service at any time without prior notice.
                        </Text>

                        <Text style={styles.contentText}>
                            The Mind Diet Service and its contents are provided
                            "as is" and "as available" without any warranty or
                            representations of any kind, whether express or
                            implied. Mind Diet is a distributor and not a
                            publisher of the content supplied by third parties;
                            as such, Mind Diet exercises no editorial control
                            over such content and makes no warranty or
                            representation as to the accuracy, reliability or
                            currency of any information, content, service or
                            merchandise provided through or accessible via the
                            Mind Diet Service. Without limiting the foregoing,
                            Mind Diet specifically disclaims all warranties and
                            representations in any content transmitted on or in
                            connection with the Mind Diet Service or on sites
                            that may appear as links on the Mind Diet Service,
                            or in the products provided as a part of, or
                            otherwise in connection with, the Mind Diet Service,
                            including without limitation any warranties of
                            merchantability, fitness for a particular purpose or
                            non-infringement of third party rights. No oral
                            advice or written information given by Mind Diet or
                            any of its affiliates, employees, officers,
                            directors, agents, or the like will create a
                            warranty. Price and availability information is
                            subject to change without notice. Without limiting
                            the foregoing, Mind Diet does not warrant that the
                            Mind Diet Service will be uninterrupted,
                            uncorrupted, timely, or error-free.
                        </Text>

                        <Text style={styles.headingText}>32. Contact Us:</Text>

                        <Text style={styles.contentText}>
                            Do not hesitate to contact us if you have any
                            questions.
                        </Text>
                        <Text style={styles.bulletContentText}>
                            {`\u2022`} Via Email: info@thefoodscientist.com
                        </Text>
                    </ScrollView>
                </View>
            </View>
            <View
                style={{
                    flex: 1.4,
                    justifyContent: "flex-end",
                    ...mainFooterStyle
                }}
            >
                <CommonButton
                    btnTitle="Accept"
                    onPress={() => handleTermsAndCondition(true)}
                    disabled={isLoading}
                />
                <CommonButton
                    btnTitle="Don’t accept "
                    onPress={() => navigate("Welcome")}
                    btnContainerStyle={{
                        backgroundColor: COLORS.white,
                        marginTop: hp(3.45),
                    }}
                    btnTextStyle={{ color: COLORS.primaryNew }}
                />
            </View>
        </View>
    );
};

export default TermsAndCondition;

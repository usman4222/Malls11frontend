import {
    SelectContent,
    SelectItem
} from "../../SiteComponents/ui/select";

export function JobsCategories() {
    return (
        <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="health">Healthcare</SelectItem>
            <SelectItem value="edu">Education</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>

            <SelectItem value="web_mobile_software">Web, Mobile & Software Development</SelectItem>
            <SelectItem value="design_creative">Design & Creative</SelectItem>
            <SelectItem value="writing_translation">Writing & Translation</SelectItem>
            <SelectItem value="sales_marketing">Sales & Marketing</SelectItem>
            <SelectItem value="admin_customer_support">Admin & Customer Support</SelectItem>
            <SelectItem value="finance_accounting">Finance & Accounting</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="engineering_architecture">Engineering & Architecture</SelectItem>
            <SelectItem value="data_science_analytics">Data Science & Analytics</SelectItem>
            <SelectItem value="education_training">Education & Training</SelectItem>
            <SelectItem value="music_audio">Music & Audio</SelectItem>
            <SelectItem value="photography_videography">Photography & Videography</SelectItem>
        </SelectContent>
    );
}

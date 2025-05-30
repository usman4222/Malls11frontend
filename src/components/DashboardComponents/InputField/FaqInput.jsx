import React from "react";
import { Button } from "../../SiteComponents/ui/button";
import { Trash2 } from "lucide-react";

const FaqInput = ({ faqs, onFaqsChange }) => {
    const handleChange = (index, field, value) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        onFaqsChange(updatedFaqs);
    };

    const addFaq = () => {
        onFaqsChange([...faqs, { question: "", answer: "" }]);
    };

    const removeFaq = (index) => {
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        onFaqsChange(updatedFaqs);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-md">
                    <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => handleChange(index, "question", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <textarea
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => handleChange(index, "answer", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <Trash2 onClick={() => removeFaq(index)} className="h-4 w-4 cursor-pointer" />
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addFaq}
                className="cursor-pointer"
            >
                Add FAQ
            </Button>
        </div>
    );
};

export default FaqInput;

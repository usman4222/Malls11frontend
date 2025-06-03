import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/SiteComponents/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProposal } from '../../../actions/proposal/proposalAction';
import { Star, MapPin, Calendar, CheckCircle } from "lucide-react"
import { formatRelativeTime } from '../../../utils/formatRelativeTime';

const ViewProposal = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { singleProposal, loadingSingleProposal } = useSelector((state) => state.clientProjects);

    useEffect(() => {
        if (id) {
            dispatch(getSingleProposal(id));
        }
    }, [dispatch, id]);


    if (loadingSingleProposal || !singleProposal) {
        return (
            <div className="p-10">
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-10 w-1/2" />
            </div>
        );
    }

    const { freelancer, project, ...proposal } = singleProposal;

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    {/* Profile Image with Verification Badge */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={singleProposal?.proposal?.freelancer_id?.profile_image}
                            alt={singleProposal?.proposal?.freelancer_id?.username}
                            width={80}
                            height={80}
                            className="rounded-full object-cover border"
                        />
                        <div className="absolute -top-1 -left-1">
                            <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header with Name and Price */}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{singleProposal?.proposal?.freelancer_id?.username}</h3>

                                {/* Rating, Location, and Time */}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-medium">0.0</span>
                                        <span className="text-gray-500">(0 Reviews)</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span> {singleProposal?.proposal?.freelancer_id?.country}</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {singleProposal?.proposal?.createdAt
                                            ? formatRelativeTime(singleProposal?.proposal?.createdAt)
                                            : "Unknown date"}
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                                {singleProposal?.proposal?.hourly_rate && (<div className="text-2xl font-bold text-gray-900"><span className='font-bold'>Hourly Rate:</span> ${singleProposal?.proposal.hourly_rate}/hr</div>)}
                                {singleProposal?.proposal?.fixed_price && (<div className="text-2xl font-bold text-gray-900"><spna className='font-bold'>Fixed Price:</spna> ${singleProposal?.proposal.fixed_price}/hr</div>)}
                            </div>
                        </div>

                        {/* Proposal Message */}
                        <div className="text-gray-700 leading-relaxed">
                            <p>
                                {singleProposal?.proposal.cover_letter}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewProposal;

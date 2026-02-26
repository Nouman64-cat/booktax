import React from 'react';
import Card from '@/components/ui/Card';
import { CollectionInfo as CollectionInfoType } from '@/types';

interface CollectionInfoProps {
    collection: CollectionInfoType;
}

export default function CollectionInfoCard({ collection }: CollectionInfoProps) {
    const isOnline = collection.status !== 'not_found';

    return (
        <Card
            title={collection.name}
            subtitle="Qdrant Vector Collection"
            glow={isOnline}
        >
            <div className="collection-info">
                <div className="collection-info__grid">
                    <div className="collection-info__item">
                        <span className="collection-info__label">Status</span>
                        <span className={`collection-info__value collection-info__value--${isOnline ? 'online' : 'offline'}`}>
                            <span className={`collection-info__dot collection-info__dot--${isOnline ? 'online' : 'offline'}`} />
                            {isOnline ? 'Online' : 'Not Found'}
                        </span>
                    </div>
                    <div className="collection-info__item">
                        <span className="collection-info__label">Vectors</span>
                        <span className="collection-info__value">{collection.vectorCount.toLocaleString()}</span>
                    </div>
                    <div className="collection-info__item">
                        <span className="collection-info__label">Dimensions</span>
                        <span className="collection-info__value">{collection.vectorSize}</span>
                    </div>
                    <div className="collection-info__item">
                        <span className="collection-info__label">Distance</span>
                        <span className="collection-info__value">{collection.distanceMetric}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

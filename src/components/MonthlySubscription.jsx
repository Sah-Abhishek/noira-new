import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faCalendarPlus,
  faClock,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function MonthlySubscription() {
  return (
    <div
      id="wellness-services-section"
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-12 flex items-center justify-center bg-black text-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Card 1: Office Wellness Bundles */}
          <div className="luxury-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 h-full flex flex-col">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-primary uppercase tracking-wide mb-3 sm:mb-4">
                OFFICE WELLNESS
                <br className="hidden sm:block" />
                BUNDLES
              </h2>

              <div className="ornamental-divider">
                <span>
                  <FontAwesomeIcon icon={faStar} className="sparkle-icon" />
                </span>
              </div>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-gray-300 font-light">
                Bring wellness directly to your workplace
              </p>
            </div>

            <div className="flex-grow space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {/* 1 Therapist */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-black text-sm sm:text-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        1 Therapist
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Full Day Service
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      £500
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      per day
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 Therapists */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-black text-sm sm:text-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        2 Therapists
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Full Day Service
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      £700
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      per day
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="gold-border-hover px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg text-primary uppercase tracking-wide">
                <FontAwesomeIcon icon={faCalendarPlus} className="mr-2 sm:mr-3" />
                Book Now
              </button>
            </div>
          </div>

          {/* Card 2: Weekly Ritual */}
          <div className="luxury-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 h-full flex flex-col">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-primary uppercase tracking-wide mb-2">
                WEEKLY RITUAL
              </h2>
              <p className="font-serif text-base sm:text-xl lg:text-2xl text-gray-300 font-light uppercase tracking-wider">
                (Monthly Subscription)
              </p>

              <div className="ornamental-divider">
                <span>
                  <FontAwesomeIcon icon={faStar} className="sparkle-icon" />
                </span>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <FontAwesomeIcon
                  icon={faStar}
                  className="sparkle-icon text-base sm:text-xl mr-2 sm:mr-3"
                />
                <p className="text-sm sm:text-lg lg:text-xl text-gray-200 font-light">
                  1 massage every week
                </p>
              </div>
              <p className="text-center text-gray-400 font-light text-xs sm:text-base">
                Choice of 60 / 90 / 120 minutes
              </p>
            </div>

            <div className="flex-grow space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                { time: "60 min", price: "£240 / month" },
                { time: "90 min", price: "£320 / month" },
                { time: "120 min", price: "£480 / month" },
              ].map((plan, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 sm:py-4 border-b border-primary/20"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-primary mr-2 sm:mr-3 text-sm sm:text-base"
                    />
                    <span className="text-white font-medium text-sm sm:text-base">
                      {plan.time}
                    </span>
                  </div>
                  <span className="text-primary font-bold text-base sm:text-xl">
                    {plan.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="sparkle-icon text-sm sm:text-lg mr-2"
                  />
                  <span className="text-primary font-semibold text-xs sm:text-sm">
                    Special Inclusion
                  </span>
                </div>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                  Includes 1 complimentary massage
                  <br />
                  <span className="text-gray-400">
                    (for yourself or to gift)
                  </span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <button className="gold-border-hover px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg text-primary uppercase tracking-wide">
                <FontAwesomeIcon icon={faStar} className="mr-2 sm:mr-3" />
                Start Ritual
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(213, 153, 64, 0.1);
        }
        .gold-border-hover {
          transition: all 0.3s ease;
          border: 2px solid var(--tw-color-primary, #D59940);
        }
        .gold-border-hover:hover {
          background: var(--tw-color-primary, #D59940);
          color: black;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(213, 153, 64, 0.3);
        }
        .ornamental-divider {
          position: relative;
          text-align: center;
          margin: 1rem 0;
        }
        .ornamental-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #D59940, transparent);
        }
        .ornamental-divider span {
          background: black;
          padding: 0 0.75rem;
          color: var(--tw-color-primary, #D59940);
          font-size: 0.8rem;
        }
        .luxury-card {
          transition: all 0.4s ease;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98));
          border: 1px solid rgba(213, 153, 64, 0.15);
        }
        .luxury-card:hover {
          transform: translateY(-6px);
          border-color: rgba(213, 153, 64, 0.3);
          box-shadow: 0 12px 25px rgba(213, 153, 64, 0.15);
        }
        .sparkle-icon {
          color: var(--tw-color-primary, #D59940);
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}

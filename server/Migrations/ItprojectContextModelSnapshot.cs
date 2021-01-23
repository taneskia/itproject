﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Models;

namespace server.Migrations
{
    [DbContext(typeof(ItprojectContext))]
    partial class ItprojectContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("server.Entities.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<DateTime?>("PasswordReset")
                        .HasColumnType("datetime");

                    b.Property<string>("ResetToken")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("datetime");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("Accounts");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Account");
                });

            modelBuilder.Entity("server.Models.AccountOrder", b =>
                {
                    b.Property<int>("OrderID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("BuyerID")
                        .HasColumnType("int");

                    b.Property<int?>("FreelancerID")
                        .HasColumnType("int");

                    b.HasKey("OrderID");

                    b.HasIndex("BuyerID");

                    b.HasIndex("FreelancerID");

                    b.ToTable("AccountOrders");
                });

            modelBuilder.Entity("server.Models.Order", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("server.Models.Product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImageURL")
                        .HasColumnType("text");

                    b.Property<int?>("MarketId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.HasKey("ID");

                    b.HasIndex("MarketId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("server.Models.ProductOrder", b =>
                {
                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("OrderID")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ProductID", "OrderID");

                    b.HasIndex("OrderID");

                    b.ToTable("ProductOrders");
                });

            modelBuilder.Entity("server.Models.Buyer", b =>
                {
                    b.HasBaseType("server.Entities.Account");

                    b.HasDiscriminator().HasValue("Buyer");
                });

            modelBuilder.Entity("server.Models.Freelancer", b =>
                {
                    b.HasBaseType("server.Entities.Account");

                    b.HasDiscriminator().HasValue("Freelancer");
                });

            modelBuilder.Entity("server.Models.Market", b =>
                {
                    b.HasBaseType("server.Entities.Account");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("Market");
                });

            modelBuilder.Entity("server.Entities.Account", b =>
                {
                    b.OwnsMany("server.Entities.RefreshToken", "RefreshTokens", b1 =>
                        {
                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            b1.Property<int>("AccountId")
                                .HasColumnType("int");

                            b1.Property<DateTime>("Created")
                                .HasColumnType("datetime");

                            b1.Property<string>("CreatedByIp")
                                .HasColumnType("text");

                            b1.Property<DateTime>("Expires")
                                .HasColumnType("datetime");

                            b1.Property<string>("ReplacedByToken")
                                .HasColumnType("text");

                            b1.Property<DateTime?>("Revoked")
                                .HasColumnType("datetime");

                            b1.Property<string>("RevokedByIp")
                                .HasColumnType("text");

                            b1.Property<string>("Token")
                                .HasColumnType("text");

                            b1.HasKey("Id");

                            b1.HasIndex("AccountId");

                            b1.ToTable("Accounts_RefreshTokens");

                            b1.WithOwner("Account")
                                .HasForeignKey("AccountId");
                        });
                });

            modelBuilder.Entity("server.Models.AccountOrder", b =>
                {
                    b.HasOne("server.Models.Buyer", "Buyer")
                        .WithMany("AccountOrders")
                        .HasForeignKey("BuyerID");

                    b.HasOne("server.Models.Freelancer", "Freelancer")
                        .WithMany("AccountOrders")
                        .HasForeignKey("FreelancerID");

                    b.HasOne("server.Models.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Product", b =>
                {
                    b.HasOne("server.Models.Market", null)
                        .WithMany("Products")
                        .HasForeignKey("MarketId");
                });

            modelBuilder.Entity("server.Models.ProductOrder", b =>
                {
                    b.HasOne("server.Models.Order", "Order")
                        .WithMany("ProductOrder")
                        .HasForeignKey("OrderID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Product", "Product")
                        .WithMany("ProductOrder")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

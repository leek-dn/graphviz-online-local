#!/usr/bin/perl

use strict;
use warnings;
use File::Copy;
# Controleer of het juiste aantal argumenten is opgegeven
if (@ARGV != 2) {
    die "Gebruik: $0 <bestandsnaam wasm> <bestandsnaam te injecteren>\n";
}
# Lees de wasmnaam en het te injecteren bestand van de opdrachtregel
my ($wasmnaam, $output_bestand) = @ARGV;

# Open het bestand om te lezen
open my $bestand, '<', $wasmnaam or die "Kan $wasmnaam niet openen: $!";
# Open het uitvoerbestand om te schrijven
open my $out_fh, '>', $output_bestand . '.out' or die "Kan $output_bestand.out niet maken: $!";
# Open het invoerbestand om te lezen
open my $in_fh,  '<', $output_bestand          or die "Kan $output_bestand     niet openen: $!";

# Initialiseer de variabele om de hexadecimale waarden op te slaan
my $hex_value = '';
# Lees het bestand byte voor byte
while (read($bestand, my $byte, 1)) {
    # Converteer het byte naar de notatie 0xHH en voeg toe aan de huidige hexadecimale waarde
    $hex_value .= sprintf("%d,", ord($byte));
}

# Sluit het bestand
close $bestand;
# Definieer de te vervangen en vervangende tekst
my $te_vervangen = '55834';
my $vervanging = "$hex_value";

# Lees regel voor regel uit het invoerbestand
while (my $regel = <$in_fh>) {
    # Vervang de tekst indien aanwezig
    $regel =~ s/\Q$te_vervangen\E/$vervanging/g;

    # Schrijf de bewerkte regel naar het uitvoerbestand
    print $out_fh $regel;
}
# Sluit beide bestanden
close $in_fh;
close $out_fh;
move($output_bestand . ".out", $output_bestand);

print "Tekst succesvol vervangen en opgeslagen in $output_bestand.\n";
